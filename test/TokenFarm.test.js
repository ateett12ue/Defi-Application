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
})
