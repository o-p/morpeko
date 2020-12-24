# Backend Assignment

## Commands

```bash
## 安裝
$ yarn

## 直接跑，預設讀取 .env -> .env.development
$ yarn start

## 調整 MAX_CLAIMABLE_SEASONS 參數後執行
$ MAX_CLAIMABLE_SEASONS=999 yarn start

## 單元測試
$ yarn test
```

## Introduction

### Profit-sharing system

Assuming we need to share our profit with massive investors.

- We share profit per season. Investors with shareholding can claim their season profit after the season has ended.

- During each season, we may addProfit one or more times.

- Investors can invest, withdraw many times during a season, but we only consider the share status at the end of the season.

- The season profit will expire in **MaxClaimableSeason** seasons

#### Requirements

- There is a implemented function getCurrentSeason()

- Support different **MaxClaimableSeason**.

- Support **invest**, **addProfit**, **withdraw**, and **claim** methods.

- Add unit tests to increase confidence in the correctness of your implementation

- Write necessary comments to help readers understand the code.

- Write a README file with step-by-step instructions on how to build and run the tests

- Choose one of Golang, Python, C, C++, TypeScript, JavaScript, or Solidity as your implementation language

- Assume we have infinite precision with your number type (double, float, number…, etc)

#### Example

```
// Suppose MaxClaimableSeason = 1

// Season 1

invest 10 	by Steve

addProfit 20

invest 15 	by Dave

addProfit 30

invest 25 	by Dave

claim 		by Dave  // Receives nothing

// Steve: 10, Dave: 40, profit: 50

// Season 2

claim 		by Dave  // Receives 40



// Season 3

invest 20 	by Steve

claim 		by Steve // Receives nothing, no profit from season 2, profit from season 1 has expired

addProfit 35

// Steve: 30, Dave: 40, profit: 35

// Season 4

claim 		by Steve // Receives 15

claim 		by Dave  // Receives 20
```
