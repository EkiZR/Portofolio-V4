const CardProject = (props) => {
	const Img = props.Img;
	const Title = props.Title;
	const Description = props.Description;
	const Link = props.Link;

	return (
		<div className="card">
			<div className="rounded-xl shadow-lg md:h-[27em] h-auto" id="Card">

				<div className="p-5 flex flex-col h-full justify-between">
					<div>
						<div className="rounded-xl overflow-hidden">
							<img src={Img} alt="Gambar Project Eki"/>
						</div>
						<h5 className="text-2xl md:text-2xl font-medium mt-3 text-[#ced4d7]">{Title}</h5>
						<p className="text-[#a6adba] text-base mt-1 text-justify ">{Description}</p>
					</div>

					<a
						href={Link}
						className="text-center md:mt-0 mt-5 bg-[#ced4d7] text-[#212121] py-2 rounded-lg font-semibold hover:bg-[#1f2937] hover:text-[#ced4d7] transition-all duration-200 ease-out">
						DEMO
					</a>
				</div>
			</div>
		</div>
	);
};

export default CardProject;
