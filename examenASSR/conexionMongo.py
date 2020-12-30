import os
from pymongo import MongoClient
 
def menu():
	"""
	Función que limpia la pantalla y muestra nuevamente el menu
	"""
	os.system('clear') # NOTA para windows tienes que cambiar clear por cls
	print ("Selecciona una opción")
	print ("\t1 - Consultar")
	print ("\t2 - Insertar")
	print ("\t9 - salir")
 
def consultar():
        try:
                client = MongoClient('localhost',27017)
                try:
                        db = client.winedb
                        col = db.wines
                        wines=col.find()
                        for wine in wines:
                                print(wine)
                finally:
                        client.close()
                
        except (MongoClient) as e:
                print("Ocurrió un error al conectar: ", e)
                
def insertar(name,year,grapes,country,region,description):
        try:
                client = MongoClient('localhost',27017)
                try:
                        db = client.winedb
                        col = db.wines
                        col.insert_one(
                           {
                              "Name": name,
                              "Year": year ,
                              "Grapes": grapes,
                              "Country": country,
                              "Region": region,
                              "Description":description
                              
                           }
                        )
                finally:
                        client.close()
                
        except (MongoClient) as e:
                print("Ocurrió un error al conectar: ", e)

        
while True:
	# Mostramos el menu
	menu()
 
	# solicituamos una opción al usuario
	opcionMenu = input("inserta un numero valor >> ")
 
	if opcionMenu=="1":
		print ("")
		consultar()
		input("\npulsa una tecla para continuar")
		
	elif opcionMenu=="2":
		print ("")
		name = input("inserta Nombre >> ")
		year = input("inserta Ano >> ")
		grapes = input("inserta Uva >> ")
		country = input("inserta Pais >> ")
		region = input("inserta Region >> ")
		description = input("inserta Descripcion >> ")
		insertar(name,year,grapes,country,region,description)
		input("\npulsa una tecla para continuar")
	elif opcionMenu=="9":
		break
	else:
		print ("")
		input("\npulsa una tecla para continuar")

