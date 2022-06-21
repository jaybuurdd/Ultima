import { useContractRead } from 'wagmi'
import { erc20ABI } from 'wagmi'
import ABI from './ABI.json'
import { useContract } from 'wagmi'
import { useSigner } from 'wagmi'


const Contract = () => {
  const [{ data: signerData, error, loading }, getSigner] = useSigner();
    const contract = useContract({
      addressOrName: '0x8D26a19F0809c03d281A1EDeC8121738A7FB0B4A',
      contractInterface: ABI,
      signerOrProvider: signerData,
    });

  
    async function getBalance() {
      try {
        const result = await contract.functions.getBalance();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  
    return { getBalance};
 };
  
  export default Contract;
