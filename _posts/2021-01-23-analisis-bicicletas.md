---
layout: post
title: "Análisis del uso de bicicletas públicas en la Ciudad de Buenos Aires"
subtitle: "Limpieza, exploración y breve análisis de datos con R para entender mejor el uso de estas en 2021"

background: '/img/ecobici.jpg'
---

## Motivación y objetivo 
En los últimos años el transporte en bicicleta ha ganado prominencia en la Ciudad de Buenos Aires, ofreciéndole a los ciudadanos beneficios para su salud, flexibilidad y evitar el costo que pueden traer otros medios de transporte.

Cambios en la infraestructura, cómo son la implementación de la red de ciclovías y el Sistema de Transporte Público de Bicicletas (STPB), son claves para fomentar el uso de estas y transicionar hacia una ciudad con una movilidad más sustentable.

**El objetivo de este proyecto es utilizar distintas visualizaciones hechas en R para entender mejor cómo se dio el uso de las bicicletas EcoBici del STPB en 2021, bajo distintas condiciones como pueden ser las estacionarias, climatológicas y aquellas referidas a características del espacio urbano porteño.** 

    

## Fuente de Datos 
Se utilizaron dos datasets: 

 - [Datos de Visual crossing](https://www.visualcrossing.com/weather/weather-data-services):
  Configurando las fechas y la ubicación, se puede descargar un csv con todas las columnas que luego se utilizan para obtener información relacionada al clima.
 -   [Datos de BA Data](https://data.buenosaires.gob.ar/dataset/bicicletas-publicas/resource/a9095876-e584-4b0d-976c-a4600455565b):
   Estos transcurren entre el 1 de enero y el 3 de diciembre de 2021. Contiene información sobre la estación de origen y la estación destino de cada viaje, fecha y hora en la que se dio cada uno y mas variables. Los campos del dataframe son de esta forma: 

| Nombre | Tipo |
| ----------- | ----------- |
| id_recorrido | string |
| duracion_recorrido | string |
| fecha_origen_recorrido | string |
| id_estacion_origen | string |
| nombre_estacion_origen | string |
| long_estacion_origen | string |
| lat_estacion_origen | string |
| fecha_destino_recorrido | string |
| id_estacion_destino | string |
| nombre_estacion_destino | string |
| direccion_estacion_destino | string |
| long_estacion_destino | string |
| lat_estacion_destino | string |
| id_usuario | string |
| modelo_bicicleta | string |
| id_recorrido | string |


## Resumen de la limpieza de datos 
El dataframe de los viajes no tiene valores vacíos. Al ver la variación de los minutos de viaje se encuentran unos registros a tener en cuenta.  

![variacion_minutos_viaje](/img/1_variacion_minutos_viaje.png)
Teniendo en cuenta que se permiten viajes de hasta 60 minutos (luego se aplican pequeñas multas) y el 99% de los datos se adecúan bien a esta norma, opté por eliminar los viajes con duración superior a 76 minutos, de forma en que no se trabaje con viajes que no representen las normas de EcoBici y se deje cierto rango para los viajes que se excedieron del tiempo máximo. 

Además, se removieron los viajes en los que se involucraron las estaciones “Balboa Definitivo” y 006 - planeada”, cuyos nombres no figuran entre las lista de estaciones que ecobici tiene registrada.


## Análisis del tránsito bajo factores naturales 
Se comenzó comparando la cantidad de viajes registrados para cada estación, teniendo en cuenta que el verano está “incompleto” por no tener los datos de los viajes registrados posteriormente al 3 de diciembre. 
![variacion_estacion](/img/2_viajes_por_estacion.png)
Se puede ver que la estación con mayor cantidad de viajes registrados es el verano, a pesar de que los datos apenas llegan al 3 de diciembre. Para las demás estaciones la demanda es muy similar. 

Al ver cómo varía la cantidad de viajes para cada estación, se encuentra un gran descenso en los fines de semana, fenómeno que se puede atribuir a que en estos días hay menos tránsito relacionado a la actividad laboral y además no hay viajes gratuitos. 

![variacion_semana](/img/3_variacion_semana.png)
El verano no sólo se mantiene mas alto respecto a las demás estaciones, sino que también es más “resistente” a la baja en la cantidad de viajes registrados que se da para las demás estaciones durante los fines de semana. 


Para la variación de la cantidad de viajes registrados respecto a los horarios del día se encuentra un comportamiento similar para las distintas temporadas, con la salvedad de que el otoño, el invierno y la primavera tienen su pico cerca de las 17 y el verano lo tiene “retrasado” a las 18. 

![variacion_dia](/img/5_variacion_dia.png)

Otra particularidad es que la primavera registra una menor cantidad de viajes que el invierno entre las 10 y las 18, a pesar de que se dieron más viajes en la primera que en la segunda.

El siguiente diagrama de caja muestra la variación de los viajes registrados según condiciones climáticas. Como sabemos, la cantidad de viajes es mayor con el clima despejado y baja cuando este empeora. 

![variacion_clima](/img/4_variación_clima.png)

Condiciones climáticas favorables ayudan a crecer el número de bicicletas usadas por día. 

¿Hay alguna correlación entre la temperatura y la cantidad de viajes que se registran? Ya se vio anteriormente que el verano, la estación que registra mayores temperaturas, es aquel que cuenta con una mayor cantidad de viajes y las demás estaciones tenían cantidades similares a pesar de tener temperaturas promedio muy distintas. Al ver el siguiente gráfico de dispersión pareciera que existe una moderada correlación. 


![relacion_temperatura](/img/6_relacion_temperatura.png)

Se observa una nube donde se contempla la concentración en la cantidad para las 3 condiciones climaticas. Se obtiene una correlación ≈0,43.

Al ver cómo queda el gráfico de dispersión para la humedad y el viento, la correlación con la cantidad de viajes es muy baja. 

![relacion_humedad](/img/7_relacion_humedad.png)

![relacion_viento](/img/8_relacion_viento.png)


Finalmente tenemos que las correlación más alta con la cantidad de viajes la tiene la hora del día, obteniendo un valor ≈0,60.  

## Análisis del tránsito bajo factores humanos 

Los datos sobre las conexiones más comunes pueden ser utilizados para la planificación de infraestructura dedicada específicamente para bicicletas, como son las ciclovías. Para ver esto, se clasificaron los viajes de dos formas: del tipo estación a -> estación a, en los que el usuario toma la bicicleta en una estación a y luego la vuelve a dejar en esta, y del tipo estación a -> estación b, aquellos en los que el usuario toma la bicicleta en una estación a y luego la deja en otra estación b. 

Se encontró que el 93.57% de los viajes son del tipo a -> b y el restante 6.43% corresponde a viajes del tipo a->a. Al ver cuáles son los viajes más utilizados, se encuentra que los más comunes son los del tipo a->a, en particular siendo a una estación cercana a una plaza o un parque. 

![viajes_mas_utilizados](/img/9_viajes_mas_utilizados.png) 

La combinación más popular es Julieta Lanteri -> Julieta Lanteri, estación que está cercana a la Reserva Ecológica Costanera Sur y lugares comunes para hacer actividades recreativas como son el Puente de la Mujer y el parque Mujeres Argentinas. Lo mismo ocurre para la estación Godoy Cruz y Libertador, que es cercana a la Plaza Holanda, el Jardín Japonés y el Paseo del Rosedal, para la estación García del Río, cercana al Parque Saavedra, para la estación Parque Centenario y para la mayoría de combinaciones que se encuentran entre las más altas.  

¿Cuáles son las combinaciones más comunes si restringimos que el origen sea distinto al destino? 

![viajes_mas_utilizados_ab](/img/10_viajes_mas_utilizados_ab.png)

Los valores más altos son entre las estaciones San José de Flores y Galicia, estando la primera cerca de la estación de tren Flores. Luego, tenemos conexiones relacionadas al “corredor” que comienza en Retiro y termina sobre Barrancas de Belgrano, en el noreste de la ciudad. 


Los sistemas de transporte pueden ser analizados como redes. La estructura de la red surge del flujo de personas (en nuestro caso bicicletas) a través de la ciudad, esta nos permite ver los distintos patrones de uso de parte de la ciudadanía y nos puede proveer información sobre factores sociológicos, económicos y geográficos en ciertas áreas.

El siguiente gráfico interactivo ilustra las estaciones de bicicletas en Buenos Aires como una red. En este, cada nodo representa una estación que adquiere un radio mayor según la cantidad de viajes que llegaron o partieron de ella. Las conexiones entre este nodo y los demás son representadas por una recta de color blanco que será mas o menos marcada según la cantidad de viajes que haya existido entre estas dos. 

<iframe src = "/img/mapa_ba_grafo.html" height = "800px" width = "100%"></iframe> 



Se vuelve a encontrar una concentración en el corredor Retiro-Barrancas de Belgrano que luego baja a la zona de los barrios Monserrat, San Nicolás, Constitución, Caballito y Palermo. Luego, en zonas alejadas de la concentración, hay pares de estaciones con conexiones muy fuertes entre sí, como es el caso de San José de Flores y Galicia, y otras con conexiones muy tenues, como es en el caso de la estación “Plaza Éxodo Jujeño” del barrio Parque Chas con la estación “Agronomía II” del barrio homónimo. 

Las estaciones cercanas a las avenidas Corrientes y Córdoba, que son de las más transitadas de la ciudad y recientemente han adquirido ciclovías, establecen conexiones fuertes entre ellas.

[ver mapa en tamaño completo](https://ezegrenat.github.io/analisis-bicicletas-ecobici/mapa_ba_grafo.html)

## Conclusiones: 
 - El 93.57% de los viajes fueron hechos por usuarios que tomaron la bicicleta en una estación para dejarla en otra distinta. El área de mayor concentración de viajes fue el “corredor” que comienza en Retiro y termina en las Barrancas de Belgrano, seguida por la zona de los barrios Monserrat, San Nicolás, Constitución y Palermo. El restante 6.43%, de aquellos que tomaron la bicicleta y la dejaron en la misma estación, utilizaron las bicicletas mayoritariamente en zonas cercanas a puntos donde es común realizar actividades recreativas, cómo pueden ser los bosques de Palermo o la Reserva Ecológica Costanera Sur. 


 - El otoño, la primavera y el invierno tuvieron un marcado descenso de la cantidad de viajes los fines de semana, mientras que el verano mostró un descenso menos abrupto en estos días.
 - Los usuarios prefirieron condiciones climáticas más favorables, como pueden ser los días despejados o nublados, y no aquellos en los que se dan lluvias.
 - Hay una correlación moderada entre las temperaturas altas y la cantidad registrada de viajes.
 - No se encontró una correlación entre la velocidad del viento o la humedad y la cantidad de viajes.
 - Las actividades de mantenimiento de las bicicletas deberían hacerse a la noche, debido al bajo uso que estas tienen a estas horas. Remover algunas bicicletas a la noche no debería causar problema a los usuarios.


## Ver el código
 - [código en html](https://ezegrenat.github.io/analisis-bicicletas-ecobici/analisis_bicicletas_2.html)
 - [repositorio en github](https://github.com/ezegrenat/analisis-bicicletas-ecobici)