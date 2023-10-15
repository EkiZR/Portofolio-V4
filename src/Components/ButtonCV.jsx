const ButtonCV = () => {
	return (
		<>
			<a
				href="https://drive.google.com/drive/folders/1BOm51Grsabb3zj6Xk27K-iRwI1zITcpo?usp=sharing"
				class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium tracking-tighter text-[#ced4d7] bg-gray-800 rounded-lg group">
				<span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#1a1a1a] rounded-full group-hover:w-56 group-hover:h-56"></span>
				<span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
				<span class="relative mr-5">Download CV</span>
				<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" id="DownloadSvg">
					<path
						fill="white"
						d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
					/>
				</svg>
			</a>
		</>
	)
}

export default ButtonCV
