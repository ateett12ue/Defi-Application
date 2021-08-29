import React, { Component } from 'react'
import dai from "../dai.png"

class Main extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table table-borderless text-muted text-center">
            <thead>
                <tr>
                   <th scope="col">Staking Balance</th>
                   <th scope="col">Reward Balance</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{window.web3.utils.fromWei(this.props.stakingBalance,'Ether')} mDai</td>
                    <td>{window.web3.utils.fromWei(this.props.dappTokenBalance,'Ether')} DAPP Token</td>
                </tr>
            </tbody>
        </table>
        <div className="card mb-4">
            <div className="card-body">
                <form className="mb-3">
                    <div>
                        <label className="float-left"><b>Stake Token</b></label>
                        <span className="float-right text-muted">
                            Balance: {window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')}
                        </span>
                    </div>
                    <div className="input-group mb-4">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="0"
                            required
                        />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <img src={dai} height="32" alt="dai image"/>
                                &nbsp;&nbsp;&nbsp; mDai
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block btn-lg" onClick={this.handleOnClick}>STAKE!</button>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Main;
