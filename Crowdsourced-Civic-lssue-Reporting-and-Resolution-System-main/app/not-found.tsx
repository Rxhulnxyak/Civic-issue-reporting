'use client';

import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <DotLottieReact
        src="/Error 404 Animation.lottie"
        loop
        autoplay
        style={{ width: 400, height: 400 }}
      />
      <h1 style={{ marginTop: 32, fontSize: 40, fontWeight: 900 }}>Page Not Found</h1>
    </div>
  );
}
