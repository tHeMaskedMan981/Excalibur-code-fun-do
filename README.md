# Excalibur-code-fun-do

## Proposed Solution

#### Phase 1 : Registration

- Every user or citizen of a country will come to our platform and register with his basic details. This may include his name, father's name, age, address, etc.
- Once registered, the person will have to go to a verification center with all his documents to support his provided information in a limited period of time.
- The verifiers will be assigned by the election commission. Every verifier will have his private public key pair, whose mapping will be there with the election commission.
- The verifier verifies the data provided in the form using the documents presented by the citizen, and on verification, makes a transaction on the blockchain which stores minimal information like UUID and Date of birth on the blockchain.
- This process is supposed to be done way before the election.

#### Phase 2 : Voting

- On the voting day, voter logs in the platform.
- The platform will already have the basic information of the voter. Using the UUID, we will check if the voter is eligible to vote or not based on his age stored on the blockchain.
- If eligible, an e-Voter Card will be generated for the user, which will have a voter ID.
- Using the verified address of the user, we will be able to figure out the constituency and the polling booth the person was supposed to vote at.
- Now the ECI head will deploy the smart contract on the blockchain, specifying the details like the voting phases of the election, start and end date and time of election, etc.
- Once the voting period starts, the voter will be able to see the candidates from his constituency contesting for the seat.
- He will select one of them, and enter a security token (kind of a password, or salt).
  This token will be used letter on to verify his vote. using the token and the voter ID, a vote hash is generated and sent along with the vote transaction.
- Once he clicks on submit vote, his actual vote is encrypted using a public key after adding a random salt.
- After the voting phase ends, the ECI Head will make a transaction, which will initiate the decryption of encrypted votes.
- We can use an oracle to decrypt the party data and send back to the contract. We can maintain a counter for each party in each constituency.
- At the end of the process, we look at the counter values to decide the winner in each constituency.
- At the end, all the vote hashes are made public and anyone can verify re-generating his vote hash whether his/her vote went to the intended candidate or not.

##### Problems Solved :

- A voter can verify whether his vote went to the intended candidate or not
- Transparency of the complete election process. As smart contracts is public, anyone can verify the logic used.
- Immutability. No more allegations and doubts like EVM Hacks.
- Increase in voter turnout. The voter doesn't have to be present physically in his constituency anymore to vote.
- Automatic Voter ID. No more standing in queues to get Voter ID Card.
- No more missing names from voter's list. Anyone who registered earlier in phase 1 and is above 18 yrs of age will be able to vote.
- Faster declaration of results. Results will be available within few hours of end of voting phase.
