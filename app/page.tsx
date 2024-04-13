import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { VerticalStepper } from '@/components/VerticalStepper';
// import { Index} from "@/components/Index/stepper";
export default function HomePage() {
  return (
    <>
      <Welcome />
      {/*<ColorSchemeToggle />*/}
      <VerticalStepper />
    </>
  );
}
