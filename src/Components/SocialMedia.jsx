import * as React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import SwipeableViews from "react-swipeable-views" // Import react-swipeable-views

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}>
			{value === index && (
				<Box
					sx={{
						px: 4,
						"@media (max-width: 960px)": {
							px: 3,
						},
					}}>
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
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	}
}

export default function SocialMedia() {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	return (
		<Box sx={{ flexGrow: 1, bgcolor: "transparent", display: "flex", height: "auto" }}>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				sx={{ borderRight: 1, borderColor: "divider" }}>
				<Tab
					label={
						<div className="flex gap-x-3 w-full">
							<img src="/SocialMediaImg/instagram.svg" alt="Instagram Eki" />
							Instagram
						</div>
					}
					{...a11yProps(0)}
					scrollButtons="auto"
					sx={{
						fontWeight: "Bold",
						color: "#ced4d7",
						fontSize: ["0.7rem", "1rem"],
					}}
				/>
				<Tab
					label={
						<div className="flex gap-x-3 w-full">
							<img src="/SocialMediaImg/tiktok.svg" alt="Tiktok Eki" />
							Tiktok
						</div>
					}
					{...a11yProps(1)}
					scrollButtons="auto"
					sx={{
						fontWeight: "Bold",
						color: "#ced4d7",
						fontSize: ["0.7rem", "1rem"],
					}}
				/>
				<Tab
					label={
						<div className="flex gap-x-3 w-full">
							<img src="/SocialMediaImg/youtube.svg" alt="Youtube Eki" />
							Youtube
						</div>
					}
					{...a11yProps(2)}
					scrollButtons="auto"
					sx={{
						fontWeight: "Bold",
						color: "#ced4d7",
						fontSize: ["0.7rem", "1rem"],
					}}
				/>
				<Tab
					label={
						<div className="flex gap-x-3 w-full">
							<img src="/SocialMediaImg/linkedin.svg" alt="Linkedin Eki" />
							Linkedin
						</div>
					}
					{...a11yProps(3)}
					scrollButtons="auto"
					sx={{
						fontWeight: "Bold",
						color: "#ced4d7",
						fontSize: ["0.7rem", "1rem"],
					}}
				/>
      <Tab
					label={
						<div className="flex gap-x-3 w-full">
							<img src="/SocialMediaImg/github.svg" alt="Github Eki" />
							Github
						</div>
					}
					{...a11yProps(4)}
					scrollButtons="auto"
					sx={{
						fontWeight: "Bold",
						color: "#ced4d7",
						fontSize: ["0.7rem", "1rem"],
					}}
				/>
			</Tabs>


			<SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
				<TabPanel value={value} index={0}>
					<a href="https://www.instagram.com/ekizr_/?hl=id">
						<img
							src="/SocialMediaImg/Instagram.jpg"
							alt="Instagram Eki"
							className="object-contain h-auto w-[10rem] md:w-[14.3rem]  rounded-xl "
						/>
					</a>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<a href="https://www.tiktok.com/@eki_zulfar">
						<img
							src="/SocialMediaImg/tiktok.jpg"
							alt="Tiktok Eki"
							className="object-contain h-auto w-[10rem] md:w-[14.3rem] rounded-xl"
						/>
					</a>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<a href="https://youtube.com/@eki_zulfar">
						<img
							src="/SocialMediaImg/youtube.jpg"
							alt="Youtube Eki"
							className="object-contain h-auto w-[10rem] md:w-[14.3rem] rounded-xl"
						/>
					</a>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<a href="https://www.linkedin.com/in/ekizr/">
						<img
							src="/SocialMediaImg/linkedin.jpg"
							alt="Linkedin Eki"
							className="object-contain h-auto w-[10rem] md:w-[14.3rem] rounded-xl"
						/>
					</a>
				</TabPanel>
        <TabPanel value={value} index={4}>
					<a href="https://github.com/EkiZR">
						<img
							src="/SocialMediaImg/github.jpg"
							alt="Github Eki"
							className="object-contain h-auto w-[10rem] md:w-[14.3rem] rounded-xl"
						/>
					</a>
				</TabPanel>
			</SwipeableViews>
		</Box>
	)
}
