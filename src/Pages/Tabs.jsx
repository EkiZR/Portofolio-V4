import React, { useEffect, useState } from "react"
import { db, collection } from "../firebase"
import { getDocs } from "firebase/firestore"
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
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material" // Import MUI icons
import { styled } from "@mui/system"

// Define custom styles for the pagination buttons
const PaginationButton = styled("button")({
	color: "rgba(255, 255, 255, 0.533)",
	background: "transparent",
	border: "none",
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"&:disabled": {
		opacity: 0.5,
		cursor: "not-allowed",
	},
})

const PageNumber = styled("div")((props) => ({
	margin: "0 0.5rem", // Adjust the margin as needed
	cursor: "pointer",
	opacity: props.currentPage === props.page ? 1 : 0.5, // Make the current page number transparent
}))

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
	const [projects, setProjects] = useState([])
	const [certificates, setCertificates] = useState([])
	const [currentPage, setCurrentPage] = useState(1) // Define currentPage
	const itemsPerPage = 6 // Define itemsPerPage

	useEffect(() => {
		// Dapatkan data dari Firebase Firestore
		const fetchData = async () => {
			try {
				const projectCollection = collection(db, "projects") // Gantilah "projects" dengan nama koleksi yang sesuai
				const certificateCollection = collection(db, "certificates") // Ganti "Certificate" dengan nama koleksi yang sesuai
				const projectQuerySnapshot = await getDocs(projectCollection)
				const certificateQuerySnapshot = await getDocs(certificateCollection)

				const projectData = projectQuerySnapshot.docs.map((doc) => doc.data())
				const certificateData = certificateQuerySnapshot.docs.map((doc) => doc.data())

				setProjects(projectData)
				setCertificates(certificateData)

				const totalProjects = projectData.length
				const totalCertificates = certificateData.length

				console.log("Data from Firestore:", projectData)
				console.log("Data from Firestore (Certificates):", certificateData)
				console.log("Total Projects:", totalProjects)
				console.log("Total Certificates:", totalCertificates)
			} catch (error) {
				console.error("Error fetching data from Firebase:", error)
			}
		}

		fetchData()
	}, [])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage)
	}

	const handleNextPage = () => {
		setCurrentPage(currentPage + 1)
	}

	const handlePreviousPage = () => {
		setCurrentPage(currentPage - 1)
	}

	const maxPage = Math.ceil(projects.length / itemsPerPage)

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
					onChangeIndex={handleChange}>
					<TabPanel value={value} index={0} dir={theme.direction}>
						<div className="container mx-auto flex justify-center items-center overflow-hidden">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
								{projects
									.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
									.map((project, index) => (
										<div key={index} data-aos="fade-up" data-aos-duration="1000">
											<CardProject
												Img={project.Img}
												Title={project.Title}
												Description={project.Description}
												Link={project.Link}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="pagination text-white flex justify-center items-center mt-2">
							<PaginationButton
								onClick={handlePreviousPage}
								disabled={currentPage === 1}
								aria-label="Previous Page">
								<KeyboardArrowLeft fontSize="medium" />
							</PaginationButton>
							{Array.from({ length: maxPage }, (_, index) => (
								<PageNumber
									key={index}
									onClick={() => handlePageChange(index + 1)}
									currentPage={currentPage} // Pass currentPage as a prop
									page={index + 1}>
									{index + 1}
								</PageNumber>
							))}

							<PaginationButton
								onClick={handleNextPage}
								disabled={currentPage === maxPage}
								aria-label="Next Page">
								<KeyboardArrowRight fontSize="medium" />
							</PaginationButton>
						</div>
					</TabPanel>
					<TabPanel value={value} index={1} dir={theme.direction}>
						<div class="container mx-auto flex justify-center items-center overflow-hidden">
							<div class="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-0">
								{certificates.map((Sertifikat, index) => (
									<div key={index} data-aos="fade-up" data-aos-duration="1000">
										<Certificate ImgSertif={Sertifikat.Img} />
									</div>
								))}

								{/* <div data-aos="fade-left" data-aos-duration="1000">
									<Certificate ImgSertif="/Sertif1.png" />
								</div>

								<div data-aos="fade-up" data-aos-duration="1000">
									<Certificate ImgSertif="/Sertif2.png" />
								</div>

								<div data-aos="fade-right" data-aos-duration="1000">
									<Certificate ImgSertif="/Sertif3.png" />
								</div> */}
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
