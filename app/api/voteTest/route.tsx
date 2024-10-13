import { ImageResponse } from 'next/og'
import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'

export const runtime = 'edge'

export async function GET(request: Request) {
    const publicClient = createPublicClient({ 
        chain: sepolia,
        transport: http()
    })

    const { searchParams } = new URL(request.url)

    const hasText = searchParams.has('text')
    const id = hasText ? parseInt(searchParams.get('text') || "1") || 1
        : 1

    const res = await publicClient.readContract({
        address: '0xdc0A0D70bf0418DA345D98190E24d4D70FD38bA1',
        abi,
        functionName: 'voteResult',
        args: [id]
    })
    console.log(res)


    return new ImageResponse(
        (
            <div
            style={{
                display: 'flex',
                background: '#f6f6f6',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                position: 'relative',
                fontSize: 75,
            }}
            >
                <span>Result: {JSON.stringify(res)}</span>
                <span>Text: {id}</span>
                <span>URL: {process.env.NEXT_PUBLIC_SITE_URL}</span>
            </div>

        )
    )
}
const abi = [
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_vote",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "voteId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "voteRegistry",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "voteId",
                "type": "uint256"
            }
        ],
        "name": "voteResult",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

