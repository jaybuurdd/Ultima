//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


interface IERC20  {

    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function transfer(address recipient, uint amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint);
    function approve(address spender, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);

}

/**
    Functionality of the Routes between the different DEX's
*/
interface IUniswapV2Router {

    function getAmountsOut(uint256 amountIn, address[] memory path) external view returns (uint256[] memory amounts);
    function swapExactTokensForTokens(uint256 amountIn, uint256 amountOutMin, address[] calldata path, address to, uint256 deadline) external returns (uint256[] memory amounts);
}

/**
    Functionality of different token pairs 
*/
interface IUniswapV2Pair {

    function token0() external view returns (address);
    function token1() external view returns (address);
    function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes calldata data) external;

}

/**
    Restrict access to given wallet address
*/
contract Ultima is Ownable {

    function swap(address router, address _tokenIn, address _tokenOut, uint256 _amount) private {
        IERC20(_tokenIn).approve(router,_amount);
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;
        uint deadline = block.timestamp + 300;
        IUniswapV2Router(router).swapExactTokensForTokens(_amount, 1, path, address(this), deadline);
    }

    /**
        Finds out how many tokens we get back if we put a certain amount in.
    */
    function getAmountOutMin(address router, address _tokenIn, address _tokenOut, uint256 _amount) public view returns (uint256){
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;
        uint256[] memory amountOutMins = IUniswapV2Router(router).getAmountsOut(_amount,path);
        return amountOutMins[path.length - 1];
    }

    /**
    * Calculate estimated amount back if two tokens were swapped between two exchanges. 
    * _router1 provides a DEX.
    * _router2 provides a second DEX.
    * _router3 provides a third DEX.
    */
    function estimateDualDexTrade(address _router1, address _router2, address _token1, address _token2, uint256 _amount) external view returns (uint256) {
        uint256 amtBack1 = getAmountOutMin(_router1, _token1, _token2, _amount); // amount you'd get if swapped t1 for t2 on exchange 1
        uint256 amtBack2 = getAmountOutMin(_router2, _token2, _token1, amtBack1); // amount you'd get if swapped t2 back to t1 on exchange 2

        return amtBack2;

    }

    /**
        Makes arbitrage trade between two exachanges.
    */
    function dualDexTrade(address _router1, address _router2, address _token1, address _token2, uint256 _amount) external onlyOwner{
        uint startBalance = IERC20(_token1).balanceOf(address(this));//get starting balance for token 1
        uint token2InitialBalance = IERC20(_token2).balanceOf(address(this));// get starting balance of token 2
        swap(_router1, _token1, _token2, _amount);// exchange 1 swap base asset for token (buy low)
        uint token2Balance = IERC20(_token2).balanceOf(address(this));// balance of token 2
        uint tradeableAmount = token2Balance - token2InitialBalance;//
        swap(_router2,_token2, _token1, tradeableAmount);// exchange 2 swap token to base asset (sell high)
        uint endBalance = IERC20(_token1).balanceOf(address(this));// get ending balance of base asset
        require(endBalance > startBalance, "Trade Reverted! No profit could be made.");// if ending balance is not greater than initial balance revert trade
    }

        // function estimateTriDexTrade(address _router1, address _router2, address _router3, address _token1, address _token2, address _token3, uint256 _amount) external view returns (uint256) {
		
        // uint amtBack1 = getAmountOutMin(_router1, _token1, _token2, _amount);
		// uint amtBack2 = getAmountOutMin(_router2, _token2, _token3, amtBack1);
		// uint amtBack3 = getAmountOutMin(_router3, _token3, _token1, amtBack2);
		// return amtBack3;

	    // }

        function getBalance (address _tokenContractAddress) external view returns (uint256) {// get balance on 
            
            uint balance = IERC20(_tokenContractAddress).balanceOf(address(this));
            return balance;

        }

        function recoverEth() external onlyOwner {
         
            payable(msg.sender).transfer(address(this).balance);// 

        }

        function recoverTokens(address tokenAddress) external onlyOwner{
            IERC20 token = IERC20(tokenAddress);
            token.transfer(msg.sender, token.balanceOf(address(this)));// transfer from contract to wallet
        }

}