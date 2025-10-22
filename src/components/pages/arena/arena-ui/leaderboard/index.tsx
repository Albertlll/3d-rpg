// Определяем интерфейс для элемента лидерборда
interface LeaderboardEntry {
	id: string;
	username: string;
	score: number;
}

// Определяем интерфейс для пропсов компонента
interface LeaderboardProps {
	data: LeaderboardEntry[];
}

function Leaderboard({ data = [] }: LeaderboardProps) {
	return (
		<div className="absolute top-[10px] left-[10px] w-[200px] bg-slate-500/20 rounded-[10px] p-2 border-[4px] border-slate-800">
			<div className="w-full h-fit flex justify-between font-bold mb-2 border-b-2 border-slate-700 pb-1">
				<div>Игрок</div>
				<div>Очки</div>
			</div>

			{data.length === 0 ? (
				<div className="text-center py-2">Нет игроков</div>
			) : (
				data.map((entry) => (
					<div
						key={entry.id}
						className="w-full h-fit flex justify-between py-1"
					>
						<div>{entry.username}</div>
						<div>{entry.score}</div>
					</div>
				))
			)}
		</div>
	);
}

export default Leaderboard;
