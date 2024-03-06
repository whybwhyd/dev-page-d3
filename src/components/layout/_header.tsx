import { ModeToggle } from '@/components/mode-toggle';
import { useRouter } from 'next/router';
import { BiLogoGithub } from 'react-icons/bi';
import { BsBookHalf } from 'react-icons/bs';

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed left-0 top-3 w-full h-80px">
      <div className="flex w-9/10 h-full">
        <div className="relative ml-8">
          <button onClick={() => router.push({ pathname: '/' })} value="Push">
            <BsBookHalf className="size-10" />
          </button>
        </div>
        <nav className="w-full p-0 mr-140px">
          <ul className="flex mr-8 justify-end gap-5">
            <li>
              <ModeToggle />
            </li>
            <li>
              <a href="https://github.com/whybwhyd/dev-page-d3">
                <BiLogoGithub className="size-10" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
