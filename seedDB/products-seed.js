const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------Backpacks
  const backpacks_titles = [
    "Mainstays Memory Foam Futon, Camel Faux Suede Fabric",
    "Mainstays Kinley Lounge Arm Chair, Beige Polyester Fabric",
    "Sawyer Mid Century Modern Fabric Sofa and Club Chairs Set, Light Grey Tweed",
    "Allewie Brown Queen Size Bed Frame with Modern Wooden Headboard,Heavy Duty Platform Metal Bed Frame with Square Frame Footboard",
    "Allewie Light Grey Queen Platform Bed Frame with 4 Drawers Storage and Square Stitched Button Tufted Upholstered Headboard",
    "Linon Ardmore Wood Corner Dining Breakfast Nook with Table and Storage, Seats 5 - 6, White and Gray",
    "Snailhome 3 Piece Dining Table Dining Set Rectangular Breakfast Wood Dining Room Table Set Table And Chair Kitchen",
    "HOMEFORT Wood Geometric Bookshelf, 5-Tier Modern Bookcase, Open Shelf and Room Divider, Freestanding Display Storage Organizer, Decorative Shelving Unit for Home Office and Living Room ",
    "Coffee Table Modern White LED Coffee Table W/2 Drawers Storage, High Gloss Finish",
    "Novashion Oval Coffee Table Sofa Side Tables Nordic Table for Living Room",
  ];
  const backpacks_imgs = [
    "https://i5.walmartimages.com/asr/6207ff5e-bc5b-459e-97b7-2aa50d130fe7.c736216792f326289d6a9817b9d1d63e.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/5f69f929-6946-4382-b6e4-59291c10e89a_1.db85d07be425bc06345f0bc68eb4e4aa.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/804842ca-ab24-4da2-9085-c4c764744e7e.4743169384c82526bdc5edd93a82269b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/5ef91e97-7a28-4823-98de-0aedbc1f1b1f.dcbfcfde074e6a461f6019530b729bf0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/05d34763-f83f-4b01-a57d-ccfd2d1f2bb9.3e5d930a05ae6e01000ad1e68863538b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/1e97b8b1-be76-4364-ae8c-4fcdeed54aab.d424c19e9465efc2137810c69b3467b0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/946f4612-5c55-4390-97c6-89dbe502d8b0.965faee038b3428287130cc24e46554a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/d664c050-3340-44b9-8cb2-ce78f09a1fb5.3f0b8c47d932d0054a413a6d4ebe1db5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/b0a07850-5bca-489f-a28e-068c9620e6b2.1b2669ea6dedce0bb7a43f4c80f6ec2c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/35b88214-da21-4c79-8f39-c99fd11d9adb.80ed5ec67569ba05b7c7ceb815c78c39.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];

  //--------------------Travel Bags
  const travel_titles = [
      "No Boundaries Juniors' Tie Front Jumpsuit",
      "Signature by Levi Strauss & Co. Women's Shaping Mid Rise Bootcut Jeans",
      "No Boundaries Men's and Big Men's Hoodie with Short Sleeves",
      "GBH Men's Long Sleeve Classic Thermal Shirts Upto 5XL",
      "Scoop Women's Fleece Joggers",
      "Scoop Women's Color Block Faux Fur Coat",
      "Scoop Women's High Crown Felt Fedora with Leopard Trim",
      "Champion Men's Mid-Weight Sleeveless Hoodie",
      "Ma Croix Mens Comfort Active Sleeveless Casual Tank Top",
      "Lugz Men's Hudson 6-Inch Water-Resistant Classic Boot (Wide Available)",
      "Genuine Leather Dress Belts For Men - Mens Belt For Suits, Jeans, Uniform With Single Prong Buckle - Designed in the USA",
  ];

  const travel_imgs = [

      "https://i5.walmartimages.com/asr/95a1c393-e14e-435b-8c8b-1b7ded1ef9af.a1feaf769d3a7658b424bb8f79f60447.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/4db506ba-1177-4e35-a47a-2d4595393695.ead9eb89aa02e10f6210da2ec128a227.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/aa5ce70b-6122-4fc9-89be-6b01ce2858ee.c1e2c9ea442011f17a47e7b8f3f2fb50.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/e3baad68-801b-406c-b7b1-be1d070ce51b_1.90d86357bda66a09f3793d7001645e64.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/0b7c962c-c2e8-4e3e-8261-e4edff09c94e.e02dc800ea72c2323771ddb7e6283e9f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/a1ee254b-18d7-4de8-ab1c-5b7f2f3ed40c.991026933e8222993723688f17361c7b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/3524e0be-7e42-4669-860f-ab6bc208edae.5540d7f50c9bdf06bc5e8d7650be6f6a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/0be8f903-fa9f-4a96-813a-d170a2b7b646_1.f1637d0a883e26a9799100b6047ffd2d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/20b53180-87e1-450c-b174-9bb3c9e8705d_1.915cbd94cb204b01b1f58a49112da5b5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/3ef2d193-02c8-41e5-9491-f88c3950d4c9.6d28df3fd6e20d6e303ca29c1332a854.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/12719954-955a-4e98-b94d-c116d6274692.bedac789540a4c35def77f6a964b5f27.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];

  //--------------------Briefcases
  const briefcases_titles = [
      "Babideal Bloom Travel Sytem Stroller and Infant Car Seat, Feather Boho",
      "Disney Mickey Mouse Having Fun 4-Piece Toddler Bedding Set, Toddler Bed, Blue",
      "Delta Children Mason 6-in-1 Convertible Crib and Changer, Grey",
      "Delta Children Waverly 3 Drawer Dresser with Changing Top, Bianca White",
      "Storkcraft Brookside 2 Drawer Changing Table Dresser, White",
      "Newborn Baby Cute Cotton Receiving White Sleeping Blanket Boy Girl Wrap Swaddle",
      "Infantino 4-in-1 Jumbo Baby Activity Gym & Ball Pit (Sloth)",
      "Electric Baby Swing Chair,Newborn Sleeping Crib, Infant Bouncer Rocking Seat,With Bluetooth Music & Remote Control & Hanging Toys,Kids Care",
      "Baby Patent Aquascale 3-in-1 Bath Tub, The Next Generation, White, Unisex",
      "Little Treasure Baby Boy Plush Bathrobe, Chevron Elephant, 0-9 Months",
      "Lupantte Baby Nail Clippers with Light, Electric Baby Nail Trimmer, Safe Baby Nail File for Newborn, Green",

      ];

  const briefcases_imgs = [
      "https://i5.walmartimages.com/asr/614c3f97-507c-461e-9e40-9b3bd77757c3_4.2ef7afa2330f1abb4af621794f1f60a9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/941debe3-8502-439f-a5f7-279159172f5b_1.28aea0c71142cde0f8642f5a4cda9452.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/5a6ccf44-1e9f-456a-a6e2-666bb048bf90.93d3e6d9f08a1759b3ec84b929434693.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/5f74bd92-e580-4dd0-b5f8-701d9536de08_1.c241d7cb71bc408810f11ac0aa5377fd.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/9a63f45d-f52f-49fe-a41e-fe9c89a4333a.053db225d217d1b98947be189622ba50.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/c529a147-9dc3-4b9f-8391-2a53b5ddbb51_1.b4fc6cf96747cd634e7ccb6478a039e7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/50ff6c7b-f1cc-4788-88c7-cadfbffa725b_1.5b350ba73164a8dc3ddb673166871d4f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/be2428b2-fb16-42be-882e-91e62dd157c4.cd84594734393c3b5436a2c8da8a1b91.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/18ec78fc-63a0-4afd-8e2b-e1f262fecd85.2ae349baa44028dbd41cf5ba56420bcb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/1c40e33f-bced-4836-892d-2c9cb5769ec5.c0de7f1d565f79983e4662ad82eb68c8.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
      "https://i5.walmartimages.com/asr/35e47a9c-7a2f-4a28-bd42-2ec2eaa6539b.7f3e0abd5e417436ea7551cdfa533674.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
 ];

  //--------------------Mini Bags
  const miniBags_titles = [
    "Apple Watch SE GPS + Cellular, 40mm Silver Aluminum Case with Abyss Blue Sport Band - Regular",
    "Hisense 65 Class 4K UHD LCD Roku Smart TV HDR R6 Series 65R6E4",
    "ASUS 14 Ryzen 5 2-in-1 8GB/256GB Laptop; 14” FHD Touch, AMD Ryzen 5 5500U, AMD Radeon Graphics, 8GB RAM, 256GB SSD, Windows 10 Home, Bespoke Black, TM420UA-WS51T",
    "Canon EOS Rebel T100 Digital SLR Camera with 18-55mm Lens Kit, 18 Megapixel Sensor, Wi-Fi, DIGIC4+, SanDisk 32GB Memory Card and Live View Shooting",
    "Samsung Galaxy Watch 4 - 44mm BT - Black- SM-R870NZKAXAA",
    "onn. 6' Smart Watch Charger for Apple Watch, Compatible with All Apple Watches - Series 7/ Series SE / Series 6 / Series 5 / Series 4 / Series 3 / Series 2 / Series 1",
    "Apple AirPods Pro with MagSafe Charging Case",
    "JBL Tune 660NC Wireless On-Ear Active Noise Cancelling Headphones (Black)",
    "Meta Quest 2 (Oculus) - Advanced All-In-One Virtual Reality Headset - 128GB",
    "Withings SCANWATCH - Hybrid Smartwatch with ECG, heart rate and oximeter - 38mm white",
    "Google Nest Mini (2nd Generation) - Sky",
    "HomePod mini - Space Gray",
    "Google Nest Cam (Indoor, Wired) - Snow",
    "Google Nest Cam Indoor Security Camera",
  ];
  const miniBags_imgs = [
    "https://i5.walmartimages.com/asr/d2308b24-af5e-4722-bdd2-4980b4f6feb2.bdb62299d1cd9bfa7591462cae957d81.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/bbc6c24c-db3f-449e-86f0-74a0dd9c5e29.13d574cd811011d8624c8fe019e34abb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/be249a0d-603b-4789-be64-7f991b1f68a2.6d273a2fc275e18e6bf3957822f983f4.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/ce0f57f7-ad6f-4e0b-a7ae-f751068597c2_1.b7e1f1bab1fd7f98cb9aef1ae9b783fb.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/e4660cfa-b034-43d3-8060-e0a94358acaa.35e962d9541a69d75bf89ed8d942ea57.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/c310d973-4dbc-4638-9967-dd043099399b.480c948fb1c1e2c3db24f8193fb0a525.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/93aa61db-93b6-4b82-82ad-5f7ec0786d00.1498af75a12946b85050ac177b05bf0c.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/6c6e5868-f3e3-4032-ba7e-554d69e359f1.b6fb3436abf045396515bf0b331c26ad.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/161f8c23-8aff-4fcd-bae7-62aec8b2b82a.2e73d44f19fa9f30a340d3dc574d35a2.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/a03329a8-d1d5-456e-b2c9-de71126092d2.811e82c7c0811a268637b75de848ee7f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/ca9bb4d9-df25-44db-a624-c9ffea68a0fe_6.f5f8c1ee13e087964c353b37fdd232c5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/b9c6fc7d-37df-4264-9942-75441b31ed9a.efdecd20d7b0991b75b2ec0a71756cb1.png?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/d24ef92a-3bcf-469a-9030-d410a9480303.cbf684d8ef735a0be3449307e536967b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/7f8f832a-ea2e-4cb0-85b1-189ececd26a1_1.9578978131fdc2df2c892a8861016802.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];

  //--------------------Large Handags

  const largeHandbags_titles = [
    "PetSafe Stay & Play Dog and Cat Wireless Fence with Replaceable Battery Collar, Up to 3/4 Acre",
    "Vibrant Life Luxe Cuddler Mattress Edition\n",
    "Vibrant Life, Single-Door Folding Dog Crate with Divider, Medium, 30\"\n",
    "GloFish Cycle 5 gal Desktop Starter Glass Aquarium Kit",
    "Aqueon Betta Falls Kit Black One Size\n",
    "SmileMart 54.5\" Double Condo Cat Tree with Scratching Post Tower, Light Gray\n",
    "Cat Scratch Deterrent Tape, Double Anti-Scratch Tape, 2021 Upgrade Cat Couch Protectors，Furniture Protectors from Cats 300cm*15cm\n",
    "Cat Craft Sea Grass Scratcher with Toy\n",
    "ALLSWELL CURVED BNB\n",
    "Vibrant Life Quilted Orthopedic Pillow Top Pet Bed, Navy, Extra Large\n",
    "PawHut Modern Dog Bed Frame, Furniture Style Pet Sofa, Cat Couch, with Soft Cushion, Washable Cover, 2 Feeding Bowls, Handles, for Small and Medium Sized Dog\n",
  ];
  const largeHandbags_imgs = [
    "https://i5.walmartimages.com/asr/fe53ad4c-23e1-48c1-8b60-641613319d1b.2c73d4e16e49efc8c253576ff5d47e55.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/2f57178e-62ca-4baf-826d-397de97d7655.eaf797f20f2cc8e6cdc61c0e43dd0e8b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/ae111a44-4827-4dfa-afde-ad2cb5ddd725_1.98efb05ee8b7390e8fc10f02eb06d23b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/633b63af-a4e9-49a7-803d-e72d849d4568.a6ed3d8fbb328c3c7430a34026999082.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/fa62dadb-cd36-470d-ac0d-e45865e9eef6.3db78e47520323e4551f7ff7319bf7f9.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/81b41b8a-093e-4dae-83c6-b6f892592613.c34eea2e439ddc00562da3d141f3126a.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/575b6e62-ae69-48c7-bcdd-e8da4d702e26.0d16f8c212f6a998e1f99531de85f849.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/eb370876-6370-4544-844a-a758def69ece_1.e1ccd9cdca9ebcc0a74da777b9600c63.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/21911db4-69ce-4178-ab07-218168681ac3.afc0c2aa177abf3b86799bf5d7ce7e90.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/222a0356-922b-480a-bb2b-87fb786234f9.12fe2b50242fe4698c1837ad751cec21.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFFtps://p1.pxfuel.com/preview/843/210/542/vera-bradley-purse-handbag-shoulder-bag.jpg",
    "https://i5.walmartimages.com/asr/22d20c41-846e-4268-91e1-90ca67113d98.516310da792e598324a9f003f5512a36.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  ];

  //-----------------------Purses
  const purses_titles = [
    "Spalding 54 In. Shatter-proof Polycarbonate Exacta height® Portable Basketball Hoop System\n",
    "Wilson NBA Authentic Indoor/Outdoor Basketball, Brown, 29.5 in.\n",
    "Lifetime Allure 10 Ft. Stand-Up Paddleboard (Paddle Included), Lavender, 90763\n",
    "Vilano Journey Inflatable 10 Ft. SUP Stand up Paddle Board Kit, Includes Pump, Gauge, Paddle, Leash and Backpack\n",
  ];
  const purses_imgs = [
    "https://i5.walmartimages.com/asr/c1432f78-daf5-4c75-9bc3-0e637efc62d9.69a4bc450c9b24b33a98ae5ba0fbb7a0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/87aa1d7a-d56f-4adb-9010-4c501da23500.e12bcc9a83f18c29ed2eb934bae7cd1b.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/47a3675e-e996-4127-ad87-df3fedab7629.9835bf8d88635f0b5a5798801119f9eb.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/be9e2c2d-71d5-4653-aaa4-e56d8050f3e8.587c2517280b31b37040a2974ccf7526.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    ];

  //-----------------Totes

  const totes_titles = [
    "Real Relax Massage Chair, Full Body Recliner with Zero Gravity Chair, Air Pressure, Bluetooth, Heat and Foot Roller Included, Brown\n",
    "Back Support Brace, Mercase Breathable Mesh Lumbar Support Belt with 7 Stays Replaceable for Lower Back Pain Relief for Men and Women, Sciatica, Herniated Disc, Scoliosis (M)",
    "Hehanda Neck Brace -Soft Neck Support Relieves Pain & Pressure in Spine - Foam Cervical Collar - Wraps Aligns Stabilizes Vertebrae - Can Be Used During Sleep\n",
    "Wrist Blood Pressure Machine Large LCD Display, Vinmall Rechargeable Blood Pressure Monitor Kit with Adjustable Bp Cuff, Carrying Case , 198 Readings for 2 Users\n",

  ];
  const totes_imgs = [
    "https://i5.walmartimages.com/asr/4890c702-ac3a-406d-b917-10246ed5c815.7daf868b55ce4b6dae9955dbcbedccd0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/410de609-516f-49ea-b05e-7ce467f8c87e.2cfa0b9444e10206d21a5d4bf0bcf772.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/eb4b69e7-7f61-43df-b0a7-7e285384e3a5.c64900b5de2641d4826edbe01b96d9e0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://i5.walmartimages.com/asr/b8642b13-de92-418e-9e75-7c8c31d8595d.a8baabb0fe4e203d5f64e9b63a48dce6.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://p0.pikrepo.com/preview/627/393/white-blue-and-red-owl-print-tote-bag.jpg",
    ];

  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(backpacks_titles, backpacks_imgs, "Home");
  await seedProducts(briefcases_titles, briefcases_imgs, "Baby");
  await seedProducts(travel_titles, travel_imgs, "Clothes");
  await seedProducts(miniBags_titles, miniBags_imgs, "Electronic");
  await seedProducts(
    largeHandbags_titles,
    largeHandbags_imgs,
    "Pets"
  );
  await seedProducts(purses_titles, purses_imgs, "Sport");
  await seedProducts(totes_titles, totes_imgs, "Health");

  await closeDB();
}

seedDB();
