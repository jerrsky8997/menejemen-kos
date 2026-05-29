import React from 'react'

const MetricsCards = ({title , stats , desc}) => {
  return (
    <>
    <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-neutral/50 tracking-wider uppercase">{title}</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold tracking-tight">{stats}</span>
              <span className="text-xs text-neutral/40">{desc || ''}</span>
            </div>
          </div>
    </>
  )
}

export default MetricsCards