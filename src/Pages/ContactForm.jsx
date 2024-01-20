import SocialMedia from "../Components/SocialMedia"
import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const ContactForm = () => {
	useEffect(() => {
		AOS.init()
		AOS.refresh()
	}, [])

	return (
		<div className="relative" id="Contact">
			<div className=" min-h-screen md:mt-20 mt-10 md:px-[10%] px-[6%]">
				<h1
					className="text-4xl font-bold mb-4 text-[#ced4d7]"
					data-aos="fade-up"
					data-aos-duration="600">
					Contact Me
				</h1>
				<div className="max-w-5xl">
					<div className="flex flex-col md:flex-row ">
						<div className="md:w-1/2 w-auto" data-aos="fade-up" data-aos-duration="1000">
							<SocialMedia />
						</div>
						<div className="md:w-1/2 w-auto">
							<div
								className="text-[#ced4d7] font-semibold md:mt-0 md:pl-1 mt-10 text-base mb-3 opacity-60"
								data-aos="fade-up"
								data-aos-duration="600">
								Have something to discuss? Send me a message and let's talk.
							</div>

							<form
								action="https://formsubmit.co/ekizulfarrachman@gmail.com"
								method="POST"
								className=" md:p-1 p-0"
								data-aos="fade-up"
								data-aos-duration="1000">
								<div className="mb-6" data-aos="fade-up" data-aos-duration="600">
									<label htmlFor="name" className="block text-[#ced4d7] font-semibold mb-2">
										Name
									</label>
									<input
										required
										type="text"
										name="name"
										id="name"
										autoComplete="off"
										placeholder="Your Name"
										className="w-full px-3 py-2 border h-14 rounded-lg focus:outline-none focus:border-[#ced4d7] bg-transparent text-[#a6adba]"
									/>
								</div>
								<div className="mb-6" data-aos="fade-up" data-aos-duration="800">
									<label htmlFor="from" className="block text-[#ced4d7] font-semibold mb-2">
										From
									</label>
									<input
										required
										type="text"
										name="from"
										id="from"
										placeholder="From"
										autoComplete="off"
										className="w-full px-3 py-2 border h-14 rounded-lg focus:outline-none focus:border-[#ced4d7] bg-transparent text-[#a6adba]"
									/>
								</div>
								<div className="mb-5" data-aos="fade-up" data-aos-duration="1000">
									<label htmlFor="message" className="block text-[#ced4d7] font-semibold mb-2">
										Message
									</label>
									<textarea
										required
										type="text"
										name="message"
										id="message"
										placeholder="Message"
										className="w-full px-3 py-2 md:h-48 h-40 border rounded-lg focus:outline-none focus:border-[#ced4d7] bg-transparent text-[#a6adba]"></textarea>
								</div>
								<input type="hidden" name="_captcha" value="false" />
								<input type="hidden" name="_template" value="table" />
								<button
									type="submit"
									className="text-center bg-[#ced4d7] text-[#212121] mb-20 font-semibold py-2 px-4 rounded-lg hover:bg-[#1f2937] hover:text-[#ced4d7] transition-all duration-200 ease-out">
									Send
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ContactForm
