import * as React from "react"
import PropTypes from "prop-types"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import CssBaseline from "@mui/material/CssBaseline"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import IconButton from "@mui/material/IconButton"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"

function HideOnScroll(props) {
	const { children, window } = props
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	})

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
}

function Home() {
	return <a href="#">HOME</a>
}

function About() {
	return <a href="#About">About</a>
}

function Contact() {
	return <a href="#Contact">Contact</a>
}

const drawerWidth = 240
const navItems = [<Home />, <About />, <Contact />]

function DrawerAppBar(props) {
	const { window } = props
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState)
	}

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }} id="Navbar">
				<b>EZR</b>
			</Typography>
			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<HideOnScroll {...props}>
				<AppBar
					component="nav"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(12px)",
            px: ["2%", "8%"], // Responsive padding values
            width: "100%",
            boxShadow: "none",
          }}
          >
					<Toolbar sx={{ }}>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}>
							<MenuIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1, display: { xs: "none", sm: "block", color: "#ced4d7" } }}
							id="Navbar">
							<b className="">EZR</b>
						</Typography>
						<Box sx={{ display: { xs: "none", sm: "block" } }}>
							{navItems.map((item) => (
								<Button key={item} sx={{ color: "#ced4d7" }} id="Navbar">
									{item}
								</Button>
							))}
						</Box>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}>
					{drawer}
				</Drawer>
			</Box>
			<Box component="main" sx={{}}>
				<Toolbar />
			</Box>
		</Box>
	)
}

DrawerAppBar.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
}

export default DrawerAppBar
