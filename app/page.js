import Navbar from "./components/Navbar";
import RankingRows from "./components/RankingRows";

export default function Home() {

  let traders = [
    { rank: 1, name: 'John Doe', profits: 5000 },
    { rank: 2, name: 'Jane Doe', profits: 4500 },
    { rank: 3, name: 'Alice Smith', profits: 6000 },
    { rank: 4, name: 'Bob Johnson', profits: 4200 },
    { rank: 5, name: 'Eva Williams', profits: 5500 },
    { rank: 6, name: 'Michael Brown', profits: 4800 },
    { rank: 7, name: 'Olivia Davis', profits: 5100 },
    { rank: 8, name: 'Daniel Miller', profits: 4900 },
    { rank: 9, name: 'Sophia Wilson', profits: 5300 },
    { rank: 10, name: 'William Martinez', profits: 4700 },
  ];

  return (
    <main className=" w-full flex flex-col items-center justify-center ">
      <Navbar />
      <h1 className=" font-mono text-6xl p-5">Prop Firm Leaderboard</h1>
      <p className="font-thin text-lg p-20">Check out the best verified prop firm traders out there</p>
      <div className="flex flex-col w-1/2 border-2 border-black border-b-0">
        <div className='flex flex-row text-center text-lg font-bold'>
          <p className=' flex-1 border-solid border-b-2 border-black py-2'>Rank</p>
          <p className='flex-1 border-solid border-b-2 border-black py-2'>Name</p>
          <p className='flex-1 border-solid border-b-2 border-black py-2'>Profits</p>
        </div>
        {traders.map((trader, index) => <RankingRows key={index} trader={trader} />)}
      </div>
      <div className="flex flex-col pt-10 justify-center items-center font-semibold text-xl">
        <p>Are you a prop firm trader that wants to keep track of your prop firm payouts?</p>
        <button className=" text-white m-5 px-8 py-2 rounded-xl bg-amber-400  hover:scale-110 w-fit duration-300 ">Join now</button>
      </div>


    </main>
  );
}
