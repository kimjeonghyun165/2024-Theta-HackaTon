function AchievementsBox({children}: {children:React.ReactNode}) {
  return (
    <div className="w-full bg-[#777777]/[0.2] rounded-[30px] flex flex-col justify-between items-center py-7 ">
      {children}
    </div>
  )
}

export default AchievementsBox