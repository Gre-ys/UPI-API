const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const dotenv = require('dotenv').config();

app.use('/.netlify/functions/api',router);

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true}, () => console.log('DB Connected...'));

const DataSchema = mongoose.Schema({
	kode: String,
	prodi: String,
	fakultas: String
});

const Data = mongoose.model('fakultas_prodi', DataSchema, 'fakultas_prodi');

router.get('/', async (req,res) => {res.send("UPI API")});

router.get('/fakultas-prodi', async (req,res) => {
	const data = await Data.find();
	const fakultas =data.map((item) => item.fakultas);
	const listFakultas = Array.from(new Set(fakultas.map(JSON.stringify))).map(JSON.parse);
	
const fakultas_prodi = listFakultas.map((fakultas) => ({
	namaFakultas:fakultas,
	listProdi:data.filter((item)=> item.fakultas === fakultas).map((item) => ({kodeProdi:item.kode, namaProdi:item.prodi}))
}))
	
	
	res.status(200)
	res.json({
		data:{
			universitas:'Universitas Pendidikan Indonesia',
			listFakultas:fakultas_prodi
		}
	});
});

router.get('/fakultas', async (req,res) => {
	 const data = await Data.find();
	 const fakultas =data.map((item) => ({namaFakultas:item.fakultas}));
	 const listFakultas = Array.from(new Set(fakultas.map(JSON.stringify))).map(JSON.parse);

	res.status(200)
	res.json({
		data:listFakultas
	})
});
	
router.get('/fakultas/:namaFakultas/prodi', async (req,res) => {
	const data = await Data.find();
	const listProdi = data.filter((item)=> item.fakultas === req.params.namaFakultas).map((item) => ({kodeProdi:item.kode, namaProdi:item.prodi}));
	
	if(listProdi.length != 0){
		res.status(200)
		res.json({
			data:{
				namaFakultas:req.params.namaFakultas,
				listProdi:listProdi
			}
		});
	}else{
		res.status(404)
		 res.json({
			 errors:[{
				 status: '404',
				 title: 'Tidak ditemukan',
				 detail: 'Prodi dari fakultas bersangkutan tidak ditemukan'
			 }]
		 });
	}
});
	
router.get('/prodi', async (req,res) => {
	 const data = await Data.find();
	 const prodi =data.map((item) => ({kode:item.kode, prodi:item.prodi}));
	 const listProdi = Array.from(new Set(prodi.map(JSON.stringify))).map(JSON.parse);
		 
		 res.status(200)
		 res.json({
				 data:listProdi
		 })	
});
	
router.get('/prodi/:kodeProdi', async (req,res) => {
	 const data = await Data.find();
	 const prodi = data.filter((item)=> item.kode === req.params.kodeProdi).map((item) => ({kode:item.kode, prodi:item.prodi, fakultas:item.fakultas}));
	 if(prodi.length !== 0){
	 	res.status(200)
		res.json({
		data:prodi[0]
	 })
	 }else{
		 res.status(404)
		 res.json({
			 errors:[{
				 status: '404',
				 title: 'Tidak ditemukan',
				 detail: 'Kode prodi tidak ditemukan'
			 }]
		 });
	 } 	 	
});

module.exports.handler = serverless(app);