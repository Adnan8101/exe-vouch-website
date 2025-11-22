import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'EXE - About';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #1a1a1a, #0a0a0a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ color: '#c9a76f', fontWeight: 'bold' }}>EXE</div>
        <div style={{ color: 'white', fontSize: 48, marginTop: 20 }}>About Our Team</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
