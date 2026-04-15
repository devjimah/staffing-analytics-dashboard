"use client"

import { useState } from "react"

const liviaBator = "https://www.figma.com/api/mcp/asset/26645df4-640a-4bdf-b00d-d58f1a102e61"
const randyPress = "https://www.figma.com/api/mcp/asset/a3f83b86-db06-4083-ab0f-800ab2b569a4"
const workman = "https://www.figma.com/api/mcp/asset/c4049db6-b1a9-433e-89a2-82900e8a1156"
const arrowRight = "https://www.figma.com/api/mcp/asset/6d0f1240-f1a9-4c63-99cf-4e550505aa78"
const sendIcon = "https://www.figma.com/api/mcp/asset/5baaae3c-0e63-4e7e-b3a1-903f610ab71f"

const contacts = [
  { name: "Livia Bator", role: "CEO", avatar: liviaBator },
  { name: "Randy Press", role: "Director", avatar: randyPress },
  { name: "Workman", role: "Designer", avatar: workman },
]

export function QuickTransfer() {
  const [selected, setSelected] = useState(0)
  const [amount, setAmount] = useState("525.50")

  return (
    <section>
      <h2 className="text-[#343c6a] text-[22px] font-semibold mb-5">Quick Transfer</h2>
      <div className="bg-white rounded-[25px] h-[276px] px-6 py-6 flex flex-col justify-between">
        {/* Contacts */}
        <div className="flex items-center gap-4">
          <div className="flex gap-4 flex-1">
            {contacts.map((contact, i) => (
              <button
                key={contact.name}
                onClick={() => setSelected(i)}
                className="flex flex-col items-center gap-2 group"
              >
                <div
                  className={`w-[70px] h-[70px] rounded-full overflow-hidden ring-2 transition-all ${
                    selected === i ? "ring-[#2d60ff] scale-110" : "ring-transparent"
                  }`}
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <p
                    className={`text-[16px] font-medium ${
                      selected === i ? "text-[#232323] font-semibold" : "text-[#232323]"
                    }`}
                  >
                    {contact.name}
                  </p>
                  <p className="text-[#718ebf] text-[15px]">{contact.role}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Arrow button */}
          <button className="w-[50px] h-[50px] bg-white rounded-full shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)] flex items-center justify-center hover:shadow-md transition-shadow shrink-0">
            <img src={arrowRight} alt="next" className="w-5 h-5 object-contain" />
          </button>
        </div>

        {/* Amount input + Send */}
        <div className="flex items-center gap-4">
          <p className="text-[#718ebf] text-[16px] shrink-0">Write Amount</p>
          <div className="flex flex-1 bg-[#edf1f7] rounded-[50px] overflow-hidden h-[50px]">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent px-6 text-[#718ebf] text-[16px] outline-none"
            />
            <button className="bg-[#1814f3] text-white px-6 h-full rounded-[50px] flex items-center gap-2 text-[16px] font-medium hover:bg-[#2d60ff] transition-colors shrink-0 shadow-[4px_4px_18px_-2px_rgba(231,228,232,0.8)]">
              Send
              <img src={sendIcon} alt="" className="w-4 h-4 object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
