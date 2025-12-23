import { User, Menu, Clock } from "lucide-react";

export default function Home() {
  return (
    // <div className="flex flex-col min-h-screen items-center justify-between gap-10">
    //   <div className="grid grid-cols-[2fr_2fr_1fr]">
    //     <div className="grid gap-2">
    //       <p>Fatigue +2</p>
    //       <p>Poisened</p>
    //     </div>
    //     <div className="grid gap-2">
    //       <div>ShieldBar</div>
    //       <div>healthBar</div>
    //     </div>
    //     <div className="grid gap-2">
    //       <Image
    //         src="https://imgs.search.brave.com/vp0EYQD3FX9O1T_vOFGhOUx62chHLqV1yPdyGvk_GWs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0"
    //         alt="profile2"
    //         width={200}
    //         height={200}
    //       />
    //       <p>Player 2</p>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-10 gap-5">
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //   </div>
    //   <div className="grid grid-cols-[1fr_2fr_2fr_2fr_1fr] items-center">
    //     <div className="">Timer</div>
    //     <div className="border-2 w-50 h-70 "></div>
    //     <div className="mx-auto">V/S</div>
    //     <div className="border-2 w-50 h-70 "></div>
    //     <div className="">Hanburger menu</div>
    //   </div>

    //   <div className="grid grid-cols-10 gap-5">
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //     <div className="border-2 w-30 h-40 "></div>
    //   </div>

    //   <div className="grid grid-cols-[1fr_2fr_2fr]">
    //     <div className="grid gap-2">
    //       <Image
    //         src="https://imgs.search.brave.com/vp0EYQD3FX9O1T_vOFGhOUx62chHLqV1yPdyGvk_GWs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTg3/ODA1MTU2L3ZlY3Rv/ci9wcm9maWxlLXBp/Y3R1cmUtdmVjdG9y/LWlsbHVzdHJhdGlv/bi5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9Z2t2TERDZ3NI/SC04SGVRZTdKc2po/bE9ZNnZSQkprX3NL/VzlseWFMZ21Mbz0"
    //         alt="profile2"
    //         width={200}
    //         height={200}
    //       />
    //       <p>Player 1</p>
    //     </div>
    //     <div className="grid gap-2">
    //       <div>ShieldBar</div>
    //       <div>healthBar</div>
    //     </div>
    //     <div className="grid gap-2">
    //       <p>Fatigue +2</p>
    //       <p>Poisened</p>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Section - Player 2 Info */}
        <div className="grid grid-cols-[4fr_4fr_1fr] gap-4 items-start">
          {/* Status Effects */}
          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="text-sm font-semibold mb-2">Status Effects</div>
          </div>

          {/* Health/Shield Bars */}
          <div className="space-y-2">
            <div className="border-2 border-gray-400 bg-white p-3 text-center">
              Shield
            </div>
            <div className="border-2 border-gray-400 bg-white p-3 text-center">
              Health
            </div>
          </div>

          {/* Player 2 Icon */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 border-2 border-gray-400 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <div className="border border-gray-400 px-4 py-1 bg-white text-sm">
              Player 2
            </div>
          </div>
        </div>

        {/* Opponent's Cards Row - Hidden */}
        <div className="relative">
          <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3">
            {[...Array(10)].map((_, i) => (
              <div
                key={`opp-${i}`}
                className="aspect-2/3 bg-gray-800 rounded"
              ></div>
            ))}
          </div>
        </div>

        {/* Middle Section - Battle Area */}
        <div className="grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 items-center py-4">
          {/* Timer */}
          <div className="flex flex-col items-center gap-1 mr-20">
            <Clock className="w-12 h-12 text-gray-700" />
            <div className="text-sm font-medium">10 sec</div>
          </div>

          {/* Player 1 Selected Card */}
          <div className="border-2 border-gray-400 bg-white aspect-2/3 flex items-center justify-center text-sm text-gray-600">
            Player 1 Card
            <br />
            (Selected)
          </div>

          <div className="mx-auto">V/S</div>

          {/* Player 2 Selected Card */}
          <div className="border-2 border-gray-400 bg-white aspect-2/3 flex items-center justify-center text-sm text-gray-600">
            Player 2 Card
            <br />
            (Selected)
          </div>

          {/* Menu */}
          <div className="flex flex-col items-center gap-1 ml-20">
            <Menu className="w-8 h-8 text-gray-700" />
            <div className="text-xs">
              Library(all
              <br />
              card details),
              <br />
              Exit Game
            </div>
          </div>
        </div>

        {/* Player's Cards Row - Visible */}
        <div className="relative">
          <div className="grid grid-cols-10 lg:grid-cols-10 md:grid-cols-6 sm:grid-cols-5 gap-2 md:gap-3">
            {[...Array(10)].map((_, i) => {
              return (
                <div
                  key={`player-${i}`}
                  className={`aspect-2/3 rounded border-2 bg-white border-gray-400 `}
                ></div>
              );
            })}
          </div>
        </div>

        {/* Bottom Section - Player 1 Info */}
        <div className="grid grid-cols-[1fr_4fr_4fr] gap-4 items-start">
          {/* Player 1 Icon */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 border-2 border-gray-400 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <div className="border border-gray-400 px-4 py-1 bg-white text-sm">
              Player 1
            </div>
          </div>

          {/* Health/Shield Bars */}
          <div className="space-y-2">
            <div className="border-2 border-gray-400 bg-white p-3 text-center">
              Shield
            </div>
            <div className="border-2 border-gray-400 bg-white p-3 text-center">
              Health
            </div>
          </div>

          {/* Status Effects */}
          <div className="border-2 border-gray-400 bg-white p-4">
            <div className="text-sm font-semibold mb-2">Status Effects</div>
          </div>
        </div>
      </div>
    </div>
  );
}
