# Morpeko 莫魯貝可

![莫魯貝可](resources/morpeko.jpg)

莫魯貝可在飽腹時，性情平和，不易暴怒；但是飢餓時，莫魯貝可的性情隨激素狀態的改變而變得凶暴。與皮丘、皮卡丘、雷丘同屬於電鼠類寶可夢。

## Commands

```bash
## 安裝
$ yarn

## 跑起來
$ yarn start

## Watch mode
$ yarn start:dev

## Production mode
$ yarn start:prod

## 單元測試
$ yarn test

## E2E test
$ yarn test:e2e

## Coverage
$ yarn test:cov
```

## Introduction

### Profit-sharing system

Assuming we need to share our profit with massive investors.

+ We share profit per season. Investors with shareholding can claim their season profit after the season has ended.

+ During each season, we may addProfit one or more times.

+ Investors can invest, withdraw many times during a season, but we only consider the share status at the end of the season.

+ The season profit will expire in __MaxClaimableSeason__ seasons

#### Requirements

+ There is a implemented function getCurrentSeason()

+ Support different __MaxClaimableSeason__.

+ Support __invest__, __addProfit__, __withdraw__, and __claim__ methods.

+ Add unit tests to increase confidence in the correctness of your implementation

+ Write necessary comments to help readers understand the code.

+ Write a README file with step-by-step instructions on how to build and run the tests

+ Choose one of Golang, Python, C, C++, TypeScript, JavaScript, or Solidity as your implementation language

+ Assume we have infinite precision with your number type (double, float, number…, etc)

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
