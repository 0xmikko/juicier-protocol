# Juicer Protocol
Juicifi. Decentralized Lending Broker

![jprotocol](https://user-images.githubusercontent.com/26343374/96940728-2cfa6c00-14d9-11eb-8ab9-ecbe538fb276.jpeg)

Juicer Protocol is a lending protocol which offers guaranteed better rates for both borrowers. It connects with all known DeFi lending protocols to provide the best interests rates.

## How it works

1. The lender wants to invest 100 USD coins. The protocol automatically chooses the offer with the highest rate. 
![jp1](https://user-images.githubusercontent.com/26343374/96941248-9af36300-14da-11eb-8832-a714b81638fb.jpeg)

2. Juicer Protocol uses best rate strategy and found that Aave provides the best one which is 3.47. 
![jp2](https://user-images.githubusercontent.com/26343374/96941255-9dee5380-14da-11eb-82d8-a9c6ede0d79c.jpeg)

3. So  it takes lender’s money and put them into Aave protocol
![jp3](https://user-images.githubusercontent.com/26343374/96941257-9e86ea00-14da-11eb-9d73-f244cc4a8073.jpeg)

4. You can see that lender got the best market rate. Then the borrower comes to scene. We also use best market strategy and offer 4.85 for borrower. To provide 100 USD Coins the protocol takes money from Aave and provide them to Borrower.
![jp4](https://user-images.githubusercontent.com/26343374/96941259-9f1f8080-14da-11eb-97ea-d255b2d5cbea.jpeg)

5. Let’s consider that step by step. At the first, we took 100 USD Coins from Lender for 3.47, then we provide them to Borrower for 4.85. As you could see, there is 1.38 extra which would be distributed between 3 parts by issuing vitamin tokes.
40% would be delivers for lenders and borrowers. The last 20% would be invested for further protocol development.

![jp5](https://user-images.githubusercontent.com/26343374/96941261-9fb81700-14da-11eb-980b-5efb828a9d3a.jpeg)

## Queue mining
What happens when the utilisation would be not optimal and Juicer Protocol would have less borrowers than lenders?
The first point is that both Lenders & Borrowers has the best market rates. Furthermore, borrowers gets vitamins tokens, which dramatically reduces their rate. Lenders, who’s assets were used for loans, also get vitamins, other lenders stays in the queue.
![jp6](https://user-images.githubusercontent.com/26343374/96941262-a181da80-14da-11eb-852e-f2a05d3c14ed.jpeg)

## Technical stack

Technical stack: Solidity, Typescript, Typechain, Next.js, React
Protocols used: Aave

## Disclaimer
   
This application is provided "as is" and "with all faults." Me as developer makes no representations or warranties of any kind concerning the safety, suitability, lack of viruses, inaccuracies, typographical errors, or other harmful components of this software. There are inherent dangers in the use of any software, and you are solely responsible for determining whether this software product is compatible with your equipment and other software installed on your equipment. You are also solely responsible for the protection of your equipment and backup of your data, and THE PROVIDER will not be liable for any damages you may suffer in connection with using, modifying, or distributing this software product.
