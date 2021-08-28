const { assert } = require('chai')

const DappToken = artifacts.require("DappToken")
const DaiToken = artifacts.require("DaiToken")
const TokenFarm = artifacts.require("TokenFarm")

require('chai').use(require('chai-as-promised')).should()

function tokens(n){
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor])=>{
    let daiToken
    let dappToken
    let tokenFarm

    // run before the test run
    before(async()=>{

        //loading contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        //transfer all Dapp Token to token farm
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        //transfer Dai Token to invester
        await daiToken.transfer(investor, tokens('1000'), {from : owner})
    })

    //testing if mock dai is deployed or not
    describe('Mock DAI deployment', async()=>{
        it('has a name', async()=>{
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    //testing if dapp token is deployed or not
    describe('Dapp Token deployment', async()=>{
        it('has a name', async()=>{
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    //testing if token farm is deployed or not
    describe('Token Farm deployment', async()=>{
        it('has a name', async()=>{
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })

        it('contract has tokens', async()=>{
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), tokens('1000000'))
        })

        it('invester has tokens', async()=>{
            let balance = await daiToken.balanceOf(investor)
            assert.equal(balance.toString(), tokens('1000'))
        })
    })

    describe('Farming Tokens', async()=>{
        it('rewards invester for staking mDai tokens', async()=>{
            // let result;
            // Check investor balance before staking
            let result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('1000'), 'investor Mock Dai wallet balance correct before staking')

            // stack Mock Dai tokens
            // approving token before sending
            await daiToken.approve(tokenFarm.address, tokens('1000'), {from: investor})
            await tokenFarm.stakeToken(tokens('1000'), {from: investor})
            // error if tokens not approved -- VM Exception - revert

            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('0'), 'investor Mock Dai wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), tokens('1000'), 'token farm Mock Dai wallet balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), tokens('1000'), 'investor staking balance in token farm Mock Dai wallet after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'investor is staking in token farm')

            await tokenFarm.issueToken({from: owner})
            
            // checking if issuing is done correctly
            result = await dappToken.balanceOf(investor)
            assert.equal(result.toString(), tokens('1000'), 'investor dapp token balance should be same as invested token')
            
            // ensure that only owner is issuing tokens
            await tokenFarm.issueToken({from: investor}).should.be.rejected;
        })
    })
})
