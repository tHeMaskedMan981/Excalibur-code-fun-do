# Excalibur [codefundo++ Final Submission]

***
#### To set up the project, follow the steps mentioned [here](excalibur_setup.md)

***



## Proposed Solution

### Overview:
Excalibur voting solution is a blockchain based voting platform, which is made keeping the security and user experience in mind. The UX is as intuitive as a normal app, however not compromising on the scalability, transperancy & anonymity. The project is made keeping in mind general elections, though the UX and details can be easily modified to fit any specific use case.

The complete project is deployed on Azure using Azure Blockchain Services and the Azure Virtual Machines.

- RPC URL for deployment on Azure Blockchain Services: [https://excalibursb2pz2block.blockchain.azure.com:3200/Zlihv_PEgvSkmq51HcTfTq3z](https://excalibursb2pz2block.blockchain.azure.com:3200/Zlihv_PEgvSkmq51HcTfTq3z)
- Public IP for VM: 

_All the Azure Deployments are linked to the __Student Subscription__ associated with the account tezansahu@gmail.com_

### Problems Solved:

- __Transparency:__ As smart contracts are public, anyone can verify the logic for vote casting & result declaration used in realtime or post-election. Voters can verify if their votes were recorded correctly
- __Immutability:__ No more allegations like EVM Hacks. It is made secure enough to make sure there is no malicious activity possible once the vote is recorded on the blockchain.
- __Anonymity:__  No one can figure out who voted for whom, even after results are declared.
- __Intuitive UI/UX :__ No extra training required for the end users to cast votes
- __Increase in voter turnout:__ The voter doesn't have to be present physically in his constituency anymore to vote.
- __Automatic Voter ID:__ No more standing in queues to get Voter ID Card.
- __No more missing names from voter's list:__ Anyone who registered in phase 1 and is above 18 yrs of age will be able to vote.
- __Faster result declaration:__ Results will be available within a few hours of the end of the voting phase.

### Solution Methodology

#### Phase 0 [Groundwork]:

- The ECI head will deploy smart contracts on the blockchain, specifying the details like voting phases of the election, start and end date/time of the election, etc.

#### Phase 1 [Registration (to be done sufficiently before the election)]:

- Every citizen will come to our platform and register with his basic details. This would include their name, age, date of birth, etc.
- Once registered, the person will have to go to a verification center with documents to support his provided information
- The verifiers will have private-public key pairs assigned by the election commission
- They will verify the data provided using the documents presented by the citizen, and on verification, will call the blockchain to store minimal information like UUID and Date of birth

#### Phase 2 [Voting]:

- On the voting day, the voter logs into the platform which already contains his basic information.
- Using the UUID & age from the blockchain, eligibility of the voter is verified & an e-Voter card with his Voter ID is generated
- After determining the voter's constituency through his verified address, the voter will be able to see candidates contesting from his constituency.
- He will select one of them, and enter a security token (kind of a password, or salt).
  *This will be used to verify his vote later. Using the token and the voter ID, a vote hash is generated and sent along with the vote transaction to the blockchain.*
- On submitting, his actual vote is encrypted using a public key after adding a random salt.

#### Phase 3 [Result Declaration]:
- After the voting phase ends, the ECI Head will make a transaction, initiating the decryption of encrypted votes using an oracle, followed by aggregation of votes in the Smart Contract
- At the end of the process, the aggregated vote count per constituency decides the winner
- All vote hashes would now be made public for voters to verify if their vote was recorded correctly


### Tech-Stack to be Used:
- Quorum (for blockchain & smart contracts)
- Microsoft Azure (for deployment)
- Angular (for front-end)
- Django (for back-end) 
