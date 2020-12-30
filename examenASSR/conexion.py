import os
import pymysql

 
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
                conexion = pymysql.connect(host='localhost',
                                     user='root',
                                     password='1234',
                                     db='peliculas')
                try:
                        with conexion.cursor() as cursor:
                                # En este caso no necesitamos limpiar ningún dato
                                cursor.execute("SELECT id, titulo, anio FROM peliculas;")

                                # Con fetchall traemos todas las filas
                                peliculas = cursor.fetchall()

                                # Recorrer e imprimir
                                for pelicula in peliculas:
                                        print(pelicula)
                finally:
                        conexion.close()
                
        except (pymysql.err.OperationalError, pymysql.err.InternalError) as e:
                print("Ocurrió un error al conectar: ", e)
def insertar(pelicula,ano):
        try:
                conexion = pymysql.connect(host='localhost',
                                     user='root',
                                     password='1234',
                                     db='peliculas')
                try:
                        with conexion.cursor() as cursor:
                                consulta = "INSERT INTO peliculas(titulo, anio) VALUES (%s, %s);"
                                #Podemos llamar muchas veces a .execute con datos distintos
                                cursor.execute(consulta, (pelicula, ano))
                        conexion.commit()
                finally:
                        conexion.close()
        except (pymysql.err.OperationalError, pymysql.err.InternalError) as e:
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
		pelicula = input("inserta Pelicula >> ")
		ano = input("inserta Ano >> ")
		insertar(pelicula,ano)
		input("\npulsa una tecla para continuar")
	elif opcionMenu=="9":
		break
	else:
		print ("")
		input("\npulsa una tecla para continuar")

