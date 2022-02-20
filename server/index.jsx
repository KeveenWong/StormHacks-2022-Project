// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');

let rawdata = fs.readFileSync('file.json');
let countdata = JSON.parse(rawdata);
console.log(countdata.num);
const article =  [
  {
    "id": 1,
      "title": "It's Not Just Your Smartphone That Will Be Affected By The 3G Shutdown This Year",
      "img": "https://cdn.iflscience.com/images/5fcfe48d-da52-5c3e-b0fc-5e56153fda82/extra_large-1645188310-cover-image.jpg",
      "img_caption": "Car GPS systems may need an update, or may not work at all.",
      "body": "In case you weren't aware, AT&T's 3G network in the US will be shutting down later this month, and other companies will be close on their heels in shutting down theirs this year. If you have a new cell phone, you likely haven’t paid much notice to this news, while people with older devices are scrambling to upgrade to 4G and 5G networks to keep their data.\nHowever, this shutdown will have much wider implications than just smartphones – a huge array of important devices still run on the old but perfectly adequate 3G network, and the shutdown is going to have some big implications. Devices including home alarms, in-car assistance features, medical devices, tracking systems, and more all still rely on 3G to work, and while some are being upgraded in time for the shutdown, others will be left behind.\nIn the US alone, millions of cars use 3G for their onboard GPS systems, as well as features that notify first responders when the car is involved in an accident. Manufacturers Cheverolet, Buick, and Cadillac have responded to the shutdown with simple software updates that will restore functionality and connect the car to 4G networks, but many cars from other manufacturers will permanently lose the emergency crash notification.\nIf you are worried about the impact this will have on your car, Consumer Reports has an up-to-date list of manufacturers and models that will be affected. \nMedical devices will also be hit by the shutdown, including systems that alert carers when there is an emergency and even systems that monitor patients with pacemakers, such as the Merlin@home™ transmitter. These companies are now sending out adapters for the systems that accept them, but in other cases, the device will have to connect to a WiFi system to maintain Internet connectivity.\nHome security systems will also be hit, with most of the popular models since 2016 relying on 3G to relay messages. Most security companies have already migrated their subscribers over to other data networks, but if you believe your security system may use 3G, you should reach out to your security provider.\nThe AT&T 3G shutdown will happen on February 22 and T-Mobile expects to have their systems shut down by the third quarter of this year; Verizon will likely end theirs by the end of 2022. For many people, it will be a case of entirely replacing some devices to remain connected to the Internet.\n\"A few million connected devices in the smart home space still need to be replaced, including my meter for my solar panels,\" said Roger Entner, analyst and founder of Recon Analytics, reports CNN.\n\"Some companies started reaching out to their customers over the past 2 years informing them that service would soon shut off, but as of 6 months ago, many products still haven't gotten around to replacing them yet.\""
  },
  {
    "id": 2,
      "title": "Plan To Discharge Fukushima Wastewater Into Pacific Under Review By UN",
      "img": "https://cdn.iflscience.com/images/3a9ecab9-adf4-5a12-a835-61c259509744/extra_large-1645201713-cover-image.jpg",
      "img_caption": "Fukushima, seen here with the currently not-tritium filled sea.",
      "body": "The International Atomic Energy Agency (IAEA), an international nuclear task force reporting to the UN, has been in Fukushima since Monday to review the country's plans to discharge contaminated water into the Pacific Ocean.\nSpeaking to reporters on Friday, IAEA deputy director general Lydie Evrard said that the taskforce had \"made significant progress in its work this week to get a better understanding of Japan's operational and regulatory plans for the discharge of the treated water.\"\nIt has been nearly eleven years since a magnitude 9.0 earthquake triggered a devastating tsunami that slammed into the East coast of Japan. The 15-meter (49.2-foot) high waves crashed into the reactors of the Fukushima Daiichi nuclear power plant, disabling the power supply of three reactor cores. Without power to the coolers, all three cores entered meltdown within days, sending radiation billowing into the atmosphere.\nJapan is still dealing with the fallout today. That isn’t an exaggeration: this week saw the first few residents of nearby Futaba go home for the first time in over a decade after local radiation levels were finally deemed low enough for people to return.\nHowever, one problem that needs a solution pretty fast is the destination of the more than a million tonnes (1.1 million tons) of wastewater contained in tanks at the site.\nOriginally, these tanks held water for cooling the damaged reactors, but levels have been steadily increasing over the years thanks to rainfall and groundwater seepage. The tanks are expected to reach their limit in a matter of months. That's why the Japanese government announced plans last year to discharge it into the ocean - a move that sparked protest almost immediately due to environmental and tourism concerns.\n\"We need to remind Japan and other nuclear states of our Nuclear Free and Independent Pacific movement slogan: if it is safe, dump it in Tokyo, test it in Paris, and store it in Washington, but keep our Pacific nuclear-free,\" Vanuatu stateswoman and veteran activist of the Nuclear Free and Independent Pacific (NFIP) movement Motarilavoa Hilda Lini said not long after Japan's announcement. \"We are people of the ocean, we must stand up and protect it.\"\nDespite these fears, the IAEA has endorsed the plan, saying that it is similar to other plants' wastewater disposal procedures.\nThe Tokyo Electric Power company, aka Tepco, which operates the plant, claims the water is treated to remove almost all radioactive elements, with only tritium – a form of hydrogen that has two neutrons - remaining. While this is toxic, experts say that the amount in the environment will be negligible when diluted across the entire ocean.\n\"The optics are terrible, but the Japanese government is actually doing the right thing in releasing treated wastewater from the Fukushima plant into the ocean,\" said Curtin University's Associate Professor of Physics & Astronomy Nigel Marks last year.\n\"By diluting the tritium/water mixture with regular sea water, the level of radioactivity can be reduced to safe levels comparable to those associated with radiation from granite rocks, bore water, medical imaging, airline travel and certain types of food.\"\nWhile the IAEA promised to “listen very carefully to local people's concerns,”, critics nevertheless oppose the plan, with Shaun Burnie, senior nuclear specialist for Greenpeace East Asia, commenting ahead of Friday’s press release that the IAEA “should be investigating the root cause of the contaminated water crisis and exploring the option of long-term storage and the best available processing technology as an alternative to the deliberate contamination of the Pacific.\"\n\"The IAEA […] has sought to justify radioactive marine pollution as having no impact and safe,\" Burnie said. \"But the IAEA is incapable of protecting the environment, human health or human rights from radiation risks - that's not its job.\"\nFor now, the IAEA has been collecting water samples and gathering technical information regarding the water disposal plan - a crucial step, especially considering dangerous isotopes including carbon-14, cobalt-60, and strontium-90 may still remain in the treated wastewater, according to a study published last year. The findings will be published in late April as the first of several reports in a multi-year review.\n\"Ensuring transparency and objectivity is crucial to the project,\" Junichi Matsumoto, a Tepco official overseeing management of the treated water, said this week. \"We hope to further improve the objectivity and transparency of the process based on the review.\""
  },
  {
    "id": 3,
      "title": "DeepMind Uses AI To Control Plasma In Nuclear Fusion Reactor",
      "img": "https://cdn.iflscience.com/images/5bb5fd27-4d5c-5903-8965-c7bd0ceb76f8/extra_large-1645104135-cover-image.jpg",
      "img_caption": "Inside the TCV Tokamak.",
      "body": "Inside a tokamak, gaseous hydrogen fuel is subjected to intense heat and pressure until it becomes plasma hotter than the Sun's core, creating the perfect environment for nuclear fusion. Powerful magnetic fields confine this plasma, preventing it from touching the walls and maintaining the reaction, but this is no easy feat - each coil must react to each variation in plasma, producing the perfect field to contain it and keep the reactor running.\nNow, DeepMind and EPFL's Swiss Plasma Center (SPC) have come up with a new approach harnessing artificial intelligence (AI) to create one unified neural network to control all the magnetic coils, making a remarkable step forward in the pursuit of limitless energy generation.\nTheir work was published in the journal Nature.\nTokamaks are donut-shaped machines used in nuclear fusion research, and are likely to be the design future potential fusion reactors will use to generate energy if it ever becomes economically viable.\nAs the plasma swirls around the torus shape with a current equivalent to a bolt of lightning, energy is carried away from the plasma field by neutrons, which have no electrical charge and are unaffected by magnetic fields. These neutrons collide with an outer \"blanket\" where they are absorbed, heating the material and generating steam to power turbines.\nTo control the magnetic field, earlier iterations of EPFL's Variable Configuration Tokamak (TCV) used 19 individual algorithms for each coil, probing the plasma thousands of times a second and reacting accordingly to confine it.\nThis new approach uses an AI designed by DeepMind that controls the variable voltage of each coil to maintain specific plasma configurations. Before they could use it on the real deal, the researchers used it on a simulation specifically designed to replicate the systems on the tokamak.\nOnce trained, the algorithm could produce specific plasma configurations by using the exact settings required, and could even create various plasma shapes and maintain two plasmas in one simulation.\nNext was testing it on the real tokamak, and the results were extremely promising, mimicking the success it previously had in the simulation. Of course, this is only one key to the ultimate puzzle of fusion energy, but it is a huge step in the right direction.\n\"Once this is done, this is not the end of the story. Then you have to make it a power plant,\" said Gianluca Sarri, Professor at Queen's University Belfast, UK, reports New Scientist.\n\"And this AI is, in my opinion, the only way forward. There are so many variables, and a small change in one of them can cause a big change in the final output. If you try to do it manually, it's a very lengthy process.\""
  }
]
let newfile = {
  "num" : countdata.num+1
}

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json(article);
});

app.post('/create', function(req, res) {
  console.log(res.body);
  if(req.body) { 
    let data = JSON.stringify(newfile);
  fs.writeFileSync('file.json', data);    
  }
});

app.get("/streak", (req, res) => {
  res.send(countdata.num.toString());
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
