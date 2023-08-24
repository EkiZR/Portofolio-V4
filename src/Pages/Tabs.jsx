import React, { useEffect } from "react"
/* import * as React from "react" */

import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import CardProject from "../Components/Card"
import Certificate from "../Components/Certificate"
import PIcon from "../Components/CardIcon"
import AOS from "aos"
import "aos/dist/aos.css"
function TabPanel(props) {
	useEffect(() => {
		AOS.init()
		AOS.refresh()
	}, [])

	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	}
}

export default function FullWidthTabs() {
	const theme = useTheme()
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	return (
		<div
			className="md:px-[10%]  md:mt-20 mt-10"
			id="Tabs"
			data-aos="fade-up"
			data-aos-duration="800">
			<Box sx={{ width: "100%" }}>
				<AppBar position="static" sx={{ bgcolor: "transparent" }} className="px-[6%]">
					<Tabs
						value={value}
						onChange={handleChange}
						textColor="secondary"
						indicatorColor="secondary"
						variant="scrollable"
						scrollButtons="auto"
						sx={{
							display: "flex",
							justifyContent: "center",
							width: "auto", // Set the width here
							margin: "0 auto", // Center-align horizontally
						}}>
						<Tab
							label="Project"
							{...a11yProps(0)}
							sx={{
								fontWeight: "Bold",
								color: "#ced4d7",
								fontSize: ["1rem", "2rem"],
							}}
						/>
						<Tab
							label="Certificate"
							{...a11yProps(1)}
							sx={{
								fontWeight: "Bold",
								color: "#ced4d7",
								fontSize: ["1rem", "2rem"],
							}}
						/>
						<Tab
							label="Tech Stack"
							{...a11yProps(2)}
							sx={{
								fontWeight: "Bold",
								color: "#ced4d7",
								fontSize: ["1rem", "2rem"],
							}}
						/>
					</Tabs>
				</AppBar>
				<SwipeableViews
					axis={theme.direction === "rtl" ? "x-reverse" : "x"}
					index={value}
					onChangeIndex={handleChangeIndex}>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<div class="container mx-auto flex justify-center items-center overflow-hidden">
							<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
								<div data-aos="fade-right" data-aos-duration="1000">
									<CardProject
										Img="/Thecats.png"
										Title="The Cats"
										Description="Membangun website galeri kucing interaktif yang memungkinkan pengguna untuk mengunggah dan berbagi foto-foto kucing mereka."
										Link="https://thecats.vercel.app/"
								/>
								</div>

								<div data-aos="fade-up" data-aos-duration="1000">
									<CardProject
										Img="/WebKelas.png"
										Title="Web Kelas"
										Description="Membangun website kelas interaktif yang berfungsi sebagai pusat informasi bagi siswa, berisi jadwal pelajaran, jadwal piket serta fitur menfess.
"										Link="https://base.xtkj3phi.repl.co/"
									/>
								</div>

								<div data-aos="fade-left" data-aos-duration="1000">
								<CardProject
									Img="/WhatsClone.png"
									Title="WhatsApp Clone"
									Description="Proyek ini adalah replika visual dari antarmuka aplikasi WhatsApp, dibangun dengan HTML, CSS, dan JavaScript. "
									Link="https://ekizr.github.io/WhatsClone/whatsapp.html"
								/>
								</div>

								<div data-aos="fade-right" data-aos-duration="1000">
								<CardProject
									Img="/Aritmatika.png"
									Title="Aritmatika Solver"
									Description="Membuat sebuah program menggunakan Python yang membantu menyelesaikan soal-soal Aritmatika dengan mudah. "
									Link="https://replit.com/@EkiZR/Aritmatika-Project"
							/>
								</div>
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<div class="container mx-auto flex justify-center items-center overflow-hidden">
							<div class="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-0">

							<div data-aos="fade-left" data-aos-duration="1000">
								<Certificate ImgSertif="/Sertif1.png" 
								/>
								</div>

								<div data-aos="fade-up" data-aos-duration="1000">
								<Certificate ImgSertif="/Sertif2.png" />
								</div>

								<div data-aos="fade-right" data-aos-duration="1000">
								<Certificate ImgSertif="/Sertif3.png" />
								</div>
						
							</div>
						</div>
					</TabPanel>
					<TabPanel value={value} index={2} dir={theme.direction}>
						<div class="container mx-auto flex justify-center items-center overflow-hidden">
							<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
								<PIcon PIcon="html.svg" Language="HTML" />
								<PIcon PIcon="css.svg" Language="CSS" />
								<PIcon PIcon="javascript.svg" Language="JavaScript" />
								<PIcon PIcon="tailwind.svg" Language="Tailwind CSS" />
								<PIcon PIcon="reactjs.svg" Language="ReactJS" />
							</div>
						</div>
					</TabPanel>
				</SwipeableViews>
			</Box>
		</div>
	)
}
