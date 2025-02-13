import dynamic from "next/dynamic"
const InfoHome = dynamic(() => import("@/components/HomeInfo/InfoHome"), { ssr: false })
export default function Home() {
  return (
    <main>
      <div className="hero text-white">
        <InfoHome />
      </div>
    </main>
  )
}