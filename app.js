const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser:true}, () => console.log('DB Connected...'));

const DataSchema = mongoose.Schema({
	kode: String,
	prodi: String,
	fakultas: String
});

const Data = mongoose.model('fakultas_prodi', DataSchema, 'fakultas_prodi');

app.get('/fakultas-prodi', async (req,res) => {
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

app.get('/fakultas', async (req,res) => {
	 const data = await Data.find();
	 const fakultas =data.map((item) => ({namaFakultas:item.fakultas}));
	 const listFakultas = Array.from(new Set(fakultas.map(JSON.stringify))).map(JSON.parse);

	res.status(200)
	res.json({
		data:listFakultas
	})
});
	
app.get('/fakultas/:namaFakultas/prodi', async (req,res) => {
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
	
app.get('/prodi', async (req,res) => {
	 const data = await Data.find();
	 const prodi =data.map((item) => ({kode:item.kode, prodi:item.prodi}));
	 const listProdi = Array.from(new Set(prodi.map(JSON.stringify))).map(JSON.parse);
		 
		 res.status(200)
		 res.json({
				 data:listProdi
		 })	
});
	
app.get('/prodi/:kodeProdi', async (req,res) => {
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

app.listen(4000, () => {
	console.log('Server Ready On Port:4000...');
});