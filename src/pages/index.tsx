import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import Typewriter from 'typewriter-effect';
import { worker } from '../mocks/browser';

export default function Home() {
  const router = useRouter();
  //mock api를 위해 설정했습니다.
  if (process.env.NODE_ENV === 'development') {
    worker.start();
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="w-max text-9xl">
        {/* Typewriter를 이용해 글씨 타이핑을 구현했습니다. */}
        <Typewriter
          options={{ autoStart: true, loop: true }}
          onInit={(typewriter) => {
            typewriter.typeString('Create your story').pauseFor(3000).start();
          }}
        />
      </div>
      <div className="text-5xl">write, remember, run</div>

      <div className="flex gap-5">
        <Button className="text-xl" onClick={() => router.push({ pathname: '/sign_up' })} value="Push">
          Sign-up
        </Button>
        <Button className="text-xl" onClick={() => router.push({ pathname: '/login_in' })} value="Push">
          Log-in
        </Button>
      </div>
    </div>
  );
}
