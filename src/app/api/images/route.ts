import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    const files = fs.readdirSync(publicDir);
    // On ne garde que les images (png, jpg, webp)
    const images = files.filter(file => 
      file.toLowerCase().endsWith('.png') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.webp')
    ).map(file => `/${file}`);
    
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}
