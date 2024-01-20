const PIcon = (props) => {
	const PIcon = props.PIcon
	const Language = props.Language

	return (
		<div className=" p-5 rounded-xl flex justify-center items-center flex-col w-auto h-auto" id="CardIcon">
			<img src={PIcon} alt="" className="h-16 w-16 md:h-20 md:w-20 "/>
			<div className="text-[#ced4d7] font-bold text-center pt-2" id="TextIcon">
				{Language}
			</div>
		</div>
	)
}

export default PIcon
