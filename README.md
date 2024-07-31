## Inspiration
In the existing leading layer chains (ETH, BNB, SOL), there are already various generative AI platforms that generate numerous transactions, significantly contributing to the ecosystem's activation. This increase in transactions plays a crucial role in invigorating the blockchain ecosystem, a fact that anyone involved in blockchain can relate to. Theta Network has its generative AI platform, EdgeCloud, developed by the foundation, but it still lacks independent generative AI platforms created by market participants. We aim to fill this gap by advancing beyond the AI platforms of existing chains, offering features that generate 3D assets in the form of fbx files and convert them into NFTs, thereby expanding the concept of NFTs beyond mere images.
Additionally, in the Web2 market, AI-based 3D asset platforms like Meshy and Luma represent this sector, recording over a million monthly traffic. In a market with few competitors, if our advanced 3D technology-equipped AI enters the market, users with a strong need for 3D assets in Web2 will naturally flow into the blockchain market using Theta Network.
Through this, we will establish a new concept in Theta Network, expand the scope of digital asset utilization, and further broaden the possibilities of blockchain technology. Our vision is to create a future where creators can more richly and diversely create and own digital assets through ANVIL AI. By combining with Theta Network, we will lead the next-generation blockchain ecosystem, providing new opportunities for creators and promoting the innovative use of digital assets globally.

## What it does
ANVIL AI simplifies the complex process of 3D modeling, making it accessible to everyone. With just a simple text prompt input, anyone can easily create 3D assets in just a few minutes. Traditionally, 3D modeling was time-consuming, but with ANVIL AI, you can create high-quality 3D assets faster than it takes to brew a cup of coffee. Moreover, our web-based platform leverages advanced AI to enable users to effortlessly generate high-quality 3D models and convert them into NFTs on the Theta blockchain. This empowers artists, designers, and creators to monetize their work in new ways. 

Key features include
Create 3D Models as NFTs: Users can input basic prompts, and the AI will generate sophisticated 3D models that can be directly minted as NFTs.

One-Click 3D Model NFT Marketplace Listing: We provide a simple procedure for users to list their 3D model NFTs on the marketplace with a single click.

Convert 3D Models to FBX Files: Users can download 3D models as FBX files for further editing in 3D modeling tools.

Download Generated Images: Users can download images of their 3D models as JPG or PNG files.

Our primary target customers include individuals who want to create NFTs, 3D asset designers, and professionals in various industries that require 3D assets, such as 3D printing, architecture, 3D animation, and 3D game development. We have received particularly high interest from indie game developers. Through interviews with 30 indie game companies, we confirmed a strong demand for our services. As a result, we plan to focus our marketing efforts on game companies to quickly drive traffic in the initial stages.

## How we built it
Cloud Service: We have chosen AWS’s robust infrastructure to ensure reliable and scalable operations.

Smart Contracts: The smart contracts were developed using Truffle and Solidity and deployed on the Theta Network. Truffle simplifies all stages from development to deployment, enabling rapid builds. This allowed us to implement contracts for converting 3D assets into NFTs, and facilitating their sale and trade.

Decentralized Storage: For NFT distribution, we efficiently manage 3D assets using the IPFS platform, Pinata. This ensures stable and decentralized storage of 3D assets, enhancing data reliability and accessibility. 

3D Model Generation: We thoroughly examined the code of major open-source libraries for reference. By decoding and reassembling, we created a new form of our own AI, leveraging the principles of Stability AI and Multiview geometry to transform 2D images into 3D models. Additionally, we employed high-resolution upscaled photos to perform a technique called Multiview image projection, which ensures high-quality textures for the 3D models. We ensured that the dataset used to train our AI (Objaverse) is free of copyright restrictions and is cleared for commercial use.

Frontend: To maximize user experience, we used React to create an interactive and responsive UI. Additionally, we utilized the Web3.js library for seamless blockchain interactions, allowing for easy implementation of blockchain-related features such as user wallet connection, login, and NFT creation.

Backend: The backend is developed using the Nest.js framework based on Node.js. Nest.js provides an intuitive and modular structure, making it useful for writing reusable code and creating scalable, maintainable REST APIs. This API acts as a bridge between the frontend and smart contracts, ensuring smooth data flow. MongoDB is used to efficiently manage NFT and user data.

## Challenges we ran into
ANVIL AI's vision is to empower leaders in the 3D industry. To ensure our service meets their needs, we have conducted extensive interviews and surveys with current 3D professionals. We visited game hubs and interviewed key figures and developers. Their feedback has been invaluable to our development efforts, and we have worked diligently to create a solution that meets their high expectations.
Initially, securing interviews was challenging, but with the help of a supportive angel, we were introduced to numerous contacts, allowing us to conduct 30 in-depth interviews (each lasting at least 30 minutes) in a short period. The insights gained from these interviews have been instrumental in creating a product that truly meets industry needs.
Furthermore, the process of gathering these insights and refining our approach has been crucial in ensuring that ANVIL AI effectively supports leaders in the 3D industry. We also achieved a significant milestone by securing mentorship from a founding member of one of the largest game companies, Netmarble, which has helped strengthen our foundation.
We are currently finalizing MOUs with Digipen University (both the Korea and Singapore branches) and Gyeonggi Game Meister High School. Additionally, we are finalizing agreements with two indie game companies, Unicon and CODENAME BOM. With more partnerships and mentors joining us, we are poised for significant growth and success.

## Accomplishments that we're proud of
Expanding the Usability of NFTs: One of the chronic issues with NFTs is their lack of practical utility. By storing 3D assets in Fbx format as metadata, the usability of NFTs can be significantly enhanced. These 3D assets can then be utilized across various platforms such as Unity, Unreal Engine, Blender, and other programs, thereby increasing their practical application.

Advanced 3D Generation AI: We have developed an AI with exceptional command understanding, setting a new standard in the market. Its advanced capabilities ensure the creation of highly accurate and intricate 3D models, pushing the boundaries of 3D asset generation.

Two styles of AI: By thoroughly deconstructing and reassembling AI technology, we have developed two specialized versions of AI, each tailored to different styles. The two primary styles—low poly and realistic—are the most prevalent design concepts in our main target market, the game industry. By offering these selective alternatives, users have a better chance of obtaining the exact 3D asset they desire.
Enhanced 3D Texture Quality: Our platform features advanced texturing capabilities that significantly enhance the quality of 3D textures. This improvement results in visually superior models with excellent detail and realism, elevating the overall quality of 3D assets created using ANVIL AI.

Seamless NFT Minting Service: We have simplified the NFT minting process, enabling users to easily create and register NFTs. This intuitive service allows users to quickly convert 3D models into tradeable digital assets without technical complexity.

## What we learned
During the development of ANVIL AI, we encountered several challenges that provided valuable lessons

Understanding Industry Requirements: By communicating with leaders in the 3D industry, we have gained a deep understanding of their specific needs and preferences. For example, in the gaming industry, there is a direction towards creating optimized, simple games for mobile platforms, as well as high-quality games for PC and consoles. Game companies focused on simple games tend to prefer models with a lower polygon count, while those aiming for high-quality games require 3D assets with high-quality texturing and realistic details. From direct consultations with industry experts, we learned the importance of creating products that meet actual demands. Therefore, we focused on developing the two most preferred art styles as a priority. 

Iterative Development: A feedback-driven approach highlighted the value of iterative development. Continuous improvement based on user insights allowed us to deliver features that better align with the expectations of 3D professionals.

Balancing Innovation and Usability: We discovered the challenge of balancing advanced technology with user-friendly design. Ensuring that sophisticated features do not overwhelm users but instead provide a smooth and intuitive experience is crucial.

Technical Integration: Integrating complex technologies like AI and blockchain into a single platform required meticulous planning and testing. Overcoming technical hurdles and ensuring a robust, reliable product taught us the importance of careful attention to detail.

Importance of Feedback Loops: Establishing continuous feedback loops with users proved essential for ongoing improvement. Regular input from industry leaders allowed us to identify and address issues early, enabling more agile responses and enhancements.

Team Cohesion: Our team consists of two full-time engineers, one management professional, and two part-time engineers. Throughout the development process, we continuously shared our vision, growing into a cohesive and robust team. Initially, we agreed to collaborate only for the duration of the hackathon. However, as the hackathon concludes, our shared vision has solidified our commitment to continue working together as a dedicated team. This unity and growth are thanks to the connections made through the THETA hackathon.

These lessons have positioned ANVIL AI as a tool that not only meets but exceeds the expectations of our target audience, establishing us as a valuable foundational team in the 3D and NFT space.

## What's next for ANVIL 3D Generative AI

Expansion of P2E Games: We will incorporate more blockchain games and multi-platform support, utilizing TNT-21 to enable item trading on marketplaces.

Increased NFT Utility: By using Theta-DRM technology, we will offer exclusive access to NFT owners and release main NFT drops with exclusive benefits.
All AI-generated content and NFTs, including games, animations, and assets created with ANVIL, can be uploaded and sold on ANVIL's integrated marketplace. This will serve as an alternative to existing 3D asset markets (e.g., Unity Asset Store, Unreal Engine Marketplace), making 3D assets more accessible to a wider audience. All these assets will be tokenized as NFTs and freely traded online. Ultimately, as more assets accumulate in the marketplace, ANVIL AI will continuously learn from them, leading to an even more advanced AI. This virtuous cycle will help ANVIL AI achieve its goal of becoming the leader in 3D asset-generating AI. We aim to accomplish all these ambitions in collaboration with Theta.
