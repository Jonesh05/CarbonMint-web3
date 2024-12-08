// "use client";

// import React, { useEffect, useState } from "react";
// import { useAccount, useSigner } from "wagmi";
// import { ethers } from "ethers";
// import { MerkleTree } from 'merkletreejs';
// import { generateZKProof } from "~/utils/zkProofs";

// interface NFTMetadata {
//   id: string;
//   contrato: string;
//   tamaño: string;
//   material: string;
//   origen_material: string;
//   proceso_productivo: string;
//   cantidad: number;
//   precio: number;
// }

// interface Stats {
//   totalSales: number;
//   nftsMinted: number;
//   totalRevenue: ethers.BigNumber;
// }

// interface Sale {
//   id: string;
//   wallet_comprador: string;
//   wallet_productor: string;
//   contrato: string;
//   hash_minteo: string;
//   cantidad: number;
//   precio: ethers.BigNumber;
// }

// interface InventoryItem extends NFTMetadata {
//   merkleProof?: string;
//   zkProof?: string;
// }

// const ProviderDashboard: React.FC = () => {
//   const { address, isConnected } = useAccount();
//   const { data: signer } = useSigner();
//   const [stats, setStats] = useState<Stats>({
//     totalSales: 0,
//     nftsMinted: 0,
//     totalRevenue: ethers.BigNumber.from(0)
//   });
//   const [sales, setSales] = useState<Sale[]>([]);
//   const [inventory, setInventory] = useState<InventoryItem[]>([]);
//   const [merkleTree, setMerkleTree] = useState<MerkleTree | null>(null);

//   // Generar Merkle Tree para datos privados
//   const generateMerkleTree = (data: InventoryItem[]) => {
//     const leaves = data.map(item => 
//       ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(item)))
//     );
//     return new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true });
//   };

//   // Generar prueba ZK para datos sensibles
//   const generateProof = async (item: InventoryItem) => {
//     const proof = await generateZKProof({
//       material: item.material,
//       origen: item.origen_material,
//       proceso: item.proceso_productivo
//     });
//     return proof;
//   };

//   useEffect(() => {
//     if (isConnected && address) {
//       const fetchData = async () => {
//         try {
//           // Simular datos del blockchain
//           const mockInventory: InventoryItem[] = [
//             {
//               id: "1",
//               contrato: "0x123...",
//               tamaño: "Grande",
//               material: "Cartón Reciclado",
//               origen_material: "Colombia",
//               proceso_productivo: "Eco-friendly",
//               cantidad: 100,
//               precio: 0.5
//             }
//           ];

//           // Generar Merkle Tree y pruebas ZK
//           const tree = generateMerkleTree(mockInventory);
//           setMerkleTree(tree);

//           const inventoryWithProofs = await Promise.all(
//             mockInventory.map(async (item) => ({
//               ...item,
//               merkleProof: tree.getHexProof(ethers.utils.keccak256(
//                 ethers.utils.toUtf8Bytes(JSON.stringify(item))
//               )),
//               zkProof: await generateProof(item)
//             }))
//           );

//           setInventory(inventoryWithProofs);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         }
//       };

//       fetchData();
//     }
//   }, [isConnected, address]);

//   const handleMint = async (sale: Sale): Promise<void> => {
//     if (!signer || !merkleTree) return;

//     try {
//       // Verificar prueba Merkle
//       const leaf = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(sale)));
//       const proof = merkleTree.getHexProof(leaf);
//       const isValid = merkleTree.verify(proof, leaf, merkleTree.getRoot());

//       if (!isValid) throw new Error("Invalid Merkle proof");

//       // Realizar minteo con datos verificados
//       const tx = await signer.sendTransaction({
//         to: sale.wallet_comprador,
//         value: sale.precio,
//         data: ethers.utils.defaultAbiCoder.encode(
//           ["bytes32", "bytes32[]"],
//           [leaf, proof]
//         )
//       });

//       await tx.wait();
//     } catch (error) {
//       console.error("Error minting NFT:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#002A15] text-white p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8">Provider Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-3 gap-6 mb-8">
//           {/* ... Stats UI ... */}
//         </div>

//         {/* Sales Table with ZK Proofs */}
//         <div className="bg-[#003A25] rounded-lg p-6 mb-8">
//           <h2 className="text-2xl font-semibold mb-4">Sales</h2>
//           {/* ... Sales Table UI with ZK verification ... */}
//         </div>

//         {/* Inventory with Merkle Proofs */}
//         <div className="bg-[#003A25] rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Inventory</h2>
//           {/* ... Inventory UI with Merkle verification ... */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProviderDashboard;
