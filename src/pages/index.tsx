import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid justify-items-center gap-10 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="w-max text-9xl">Create your story</div>
      <div className="text-5xl">write, remember, run</div>

      <div className="flex gap-5">
        <Button onClick={() => router.push({ pathname: '/sign_Up' })} value="Push">
          SignUp
        </Button>
        <Button>Login</Button>
      </div>
    </div>
  );
}
