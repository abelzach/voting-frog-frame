/** @jsxImportSource frog/jsx */

import { addMetaTags } from '@/app/xmtp/xmtpMetaTags'
import { xmtpSupport } from '@/app/xmtp/xmtpMiddleware'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'

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
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  title: "Open Frames Starter Frog",
  ...addMetaTags("xmtp"),
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'


app.use(xmtpSupport);

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  const option = buttonValue
  const number = inputText

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `You have selected ${option ? ` ${option.toUpperCase()} at number ${number}!` : ''}`
            : 'Sic Bo!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Bet number?" />,
      <Button value="big">Big</Button>,
      <Button value="small">Small</Button>,
      <Button value="specific_triple">Specific Triple</Button>,
      <Button value="any_triple">Any Triple</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})


app.frame('/lose', (c) => {
  const { buttonValue, inputText, status } = c
  const person = inputText || buttonValue
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        {status === 'initial' ? (
          'Vote for who will lose the election!'
        ) : (
          `You have voted for: ${buttonValue?.toUpperCase()}`
        )}
      </div>
    ),
    intents: [
      <TextInput placeholder="Who will lose the election?" />,
      <Button value="trump">Trump</Button>,
      <Button value="kamala">Kamala</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

app.frame('/trans', (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Voting Contract
      </div>
    ),
    intents: [
        <TextInput placeholder="ID" />,
      <Button.Transaction action='/finish' target="/vote">Vote</Button.Transaction>,
      <Button action='/getVote'>Find out</Button>,
    ]
  })
})

app.frame('/finish', (c) => {
  let address: `0x${string}`;

  // XMTP verified address
  const { verifiedWalletAddress } = (c?.var as any) || {};

  if (verifiedWalletAddress) {
    address = verifiedWalletAddress as `0x${string}`;
  } else {
    address = "0x0" as `0x${string}`;
  }

  const { transactionId } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>
        Transaction ID: {transactionId}
        XMTP Address ID: {address}
      </div>
    )
  })
})


app.transaction('/vote', (c) => {
  // Send transaction response.
  const id = parseInt(c.inputText || "1") || 1
  return c.contract({
    abi,
    chainId: 'eip155:11155111',
    to: '0xdc0A0D70bf0418DA345D98190E24d4D70FD38bA1',
    functionName: 'vote',
    args: [true, id]
  })
})

app.frame('/getVote', (c) => {

    const inputText = c.frameData?.inputText  || ""

    const newSearchParams = new URLSearchParams({
        text: inputText,
    })

    return c.res({
        image: `${process.env.NEXT_PUBLIC_SITE_URL}/api/voteTest?${newSearchParams}`,
        intents: [
            <TextInput placeholder="ID" />,
            <Button.Transaction action='/finish' target="/vote">Vote</Button.Transaction>,
            <Button action='/getVote'>Find out</Button>,
        ]
    })
})
devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
