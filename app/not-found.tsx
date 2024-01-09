import Link from 'next/link';
import DogImage from '@/assets/images/dog.png';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex w-full flex-col p-3 items-center justify-center h-screen gap-4">
      <Image src={DogImage} alt="Dog" width={300} height={300} />
      <h1 className="text-xl text-center">
        Are you lost my child? <br />
        Let me take you to the{' '}
        <Link href="/home">
          <span className="underline text-blue-500 italic">home</span>
        </Link>
      </h1>
    </div>
  );
}
