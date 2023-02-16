import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
    console.log("/");
  }, [router]);
  return (
    <div>
      <h1 className="text-center">404 Page not found!</h1>
    </div>
  );
};

export default NotFound;
