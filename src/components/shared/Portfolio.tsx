import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth";

const ProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src="/avatar.png"
          width={40}
          height={40}
          alt="Avatar"
          className="rounded-full bg-gray-300 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 p-2">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -10, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -10, scale: 0.95 },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <DropdownMenuItem asChild>
            <Link href="/login" onClick={() => logout()}>
              Logout
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/portfolio">Portfolio</Link>
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
