// const SupplyDemandSection = ({ data }) => (
//     <div className="border-b border-custom-purple pb-4">
//         <h3 className="text-lg font-bold">📊 Supply & Demand</h3>
//         <p className="text-gray-300 mb-2">{data?.volume_analysis || "No available data"}</p>
//         <div className="grid grid-cols-3 gap-4">
//             <EMABox label="50d EMA:" value={data?.moving_averages?.day_ema_50} />
//             <EMABox label="150d EMA:" value={data?.moving_averages?.day_ema_150} />
//             <EMABox label="200d EMA:" value={data?.moving_averages?.day_ema_200} />
//         </div>
//     </div>
// );