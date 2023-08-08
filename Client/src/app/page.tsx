import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black justify-between p-24">
      <div className=" bg-white hover:bg-black hover:text-white p-10 cursor-button ">
        <Link href={'/project/1'}>
        go to project
        </Link>
      </div>
    </main>
  )
}
