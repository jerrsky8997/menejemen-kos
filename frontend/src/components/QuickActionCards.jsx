import React from 'react'
import { useNavigate } from 'react-router-dom'

const QuickActionCards = ({icon, title, description, border ,navigate , buttonText}) => {
  const navigateTo = useNavigate()
  return (
    <>
    <div className={`border border-base-300 rounded-xl p-4 flex items-start gap-4 hover:${border} transition-all group`}>
              <div className="p-3 bg-primary/10 rounded-xl text-primary text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-neutral">{title}</h3>
                <p className="text-xs text-neutral/50 mt-0.5 mb-3">{description}</p>
                <button 
                  onClick={() => navigateTo(navigate)}
                  className="btn btn-xs btn-outline btn-primary tracking-wide text-[11px] rounded-2xl px-3.5 py-1.5"
                >
                  {buttonText}
                </button>
              </div>
    </div>
    </>
  )
}

export default QuickActionCards

