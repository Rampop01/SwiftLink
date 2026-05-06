import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || 'user';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          backgroundImage: 'radial-gradient(circle at 25% 25%, #1a1a1a 0%, #000 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: '#35D07F', // Celo Green
              marginRight: 15,
            }}
          />
          <span style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>SwiftLink</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 40,
            padding: '60px 80px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: '#35D07F',
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 'bold',
            }}
          >
            Payment Requested
          </div>
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: 20,
            }}
          >
            @{username}
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              maxWidth: 600,
            }}
          >
            Scan or click to send secure payments on the Celo network.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          Powered by Celo • Verified by SwiftLink
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
