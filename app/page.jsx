"use client";
import { useState, useMemo } from "react";

const DB = [{"n": "Abacate (Hass)", "c": "Frutas", "g": "60g", "y": "80g", "r": "93g", "t": "Porções maiores contêm sorbitol", "s": "yellow"}, {"n": "Abacaxi", "c": "Frutas", "g": "140g", "y": "195g", "r": "245g", "t": "Porções maiores contêm frutanos", "s": "yellow"}, {"n": "Açaí (polpa)", "c": "Frutas", "g": "20g (pó)", "y": null, "r": null, "t": "Dados limitados. Teste com cautela", "s": "green"}, {"n": "Ameixa", "c": "Frutas", "g": "5g", "y": "12g", "r": "66g", "t": "Rica em sorbitol. Cuidado com quantidade", "s": "yellow"}, {"n": "Amora", "c": "Frutas", "g": "4g", "y": "7g", "r": "160g", "t": "Contém sorbitol mesmo em pequenas porções", "s": "yellow"}, {"n": "Banana nanica (firme)", "c": "Frutas", "g": "95g", "y": "100g", "r": "123g", "t": "Prefira menos madura. Mais madura = mais frutanos", "s": "yellow"}, {"n": "Banana nanica (madura)", "c": "Frutas", "g": "37g", "y": "47g", "r": "95g", "t": "Madura contém mais frutanos", "s": "yellow"}, {"n": "Banana prata", "c": "Frutas", "g": "112g", "y": null, "r": null, "t": "Segura em porções normais", "s": "green"}, {"n": "Caqui", "c": "Frutas", "g": "60g", "y": "65g", "r": "75g", "t": "Contém frutanos em porções maiores", "s": "yellow"}, {"n": "Carambola", "c": "Frutas", "g": "94g", "y": null, "r": null, "t": "Segura", "s": "green"}, {"n": "Cereja", "c": "Frutas", "g": "20g", "y": "31g", "r": "150g", "t": "Contém frutose e sorbitol", "s": "yellow"}, {"n": "Coco (polpa fresca)", "c": "Frutas", "g": "81g", "y": "96g", "r": "123g", "t": "Porções maiores contêm sorbitol", "s": "yellow"}, {"n": "Coco ralado seco", "c": "Frutas", "g": "30g", "y": "35g", "r": "51g", "t": "Contém sorbitol acima de 35g", "s": "yellow"}, {"n": "Cranberry seco", "c": "Frutas", "g": "22g", "y": "28g", "r": "30g", "t": "Contém frutanos", "s": "yellow"}, {"n": "Damasco", "c": "Frutas", "g": "67g", "y": "70g", "r": "102g", "t": "Contém sorbitol", "s": "yellow"}, {"n": "Damasco seco", "c": "Frutas", "g": null, "y": null, "r": "30g", "t": "Alto em sorbitol e frutanos. Evitar", "s": "red"}, {"n": "Figo fresco", "c": "Frutas", "g": "7g", "y": "9g", "r": "50g", "t": "Contém frutose mesmo em porções pequenas", "s": "yellow"}, {"n": "Framboesa", "c": "Frutas", "g": "58g", "y": "75g", "r": "88g", "t": "Contém frutose acima de 75g", "s": "yellow"}, {"n": "Goiaba (madura)", "c": "Frutas", "g": "90g", "y": null, "r": null, "t": "Segura quando madura", "s": "green"}, {"n": "Grapefruit/Toranja", "c": "Frutas", "g": "90g", "y": "121g", "r": "238g", "t": "Contém frutanos acima de 121g", "s": "yellow"}, {"n": "Kiwi", "c": "Frutas", "g": "150g", "y": "275g", "r": "350g", "t": "Excelente opção. Pode ajudar na constipação", "s": "yellow"}, {"n": "Laranja", "c": "Frutas", "g": "130g", "y": "152g", "r": "229g", "t": "Contém frutose acima de 152g", "s": "yellow"}, {"n": "Limão (suco)", "c": "Frutas", "g": "21g", "y": "178g", "r": "223g", "t": "Livre em porções normais de tempero", "s": "yellow"}, {"n": "Lichia", "c": "Frutas", "g": "96g", "y": "130g", "r": "150g", "t": "Contém sorbitol acima de 130g", "s": "yellow"}, {"n": "Maçã verde", "c": "Frutas", "g": "27g", "y": "42g", "r": "200g", "t": "Alta em frutose e sorbitol. Uma das maiores triggers", "s": "yellow"}, {"n": "Maçã vermelha", "c": "Frutas", "g": "20g", "y": "31g", "r": "200g", "t": "Alta em frutose e sorbitol", "s": "yellow"}, {"n": "Mamão (verde e maduro)", "c": "Frutas", "g": "140g", "y": null, "r": null, "t": "Excelente opção para o trânsito", "s": "green"}, {"n": "Manga", "c": "Frutas", "g": "7g", "y": "9g", "r": "140g", "t": "Alta em frutose. Evitar em porções normais", "s": "yellow"}, {"n": "Maracujá", "c": "Frutas", "g": "46g", "y": "98g", "r": "123g", "t": "Contém frutanos acima de 98g", "s": "yellow"}, {"n": "Melancia", "c": "Frutas", "g": "18g", "y": "24g", "r": "150g", "t": "Alta em frutose, frutanos e manitol", "s": "yellow"}, {"n": "Melão cantaloupe", "c": "Frutas", "g": "121g", "y": "150g", "r": "154g", "t": "Contém frutanos acima de 150g", "s": "yellow"}, {"n": "Mexerica/Tangerina", "c": "Frutas", "g": "90g", "y": "97g", "r": "146g", "t": "Segura em 1 unidade", "s": "yellow"}, {"n": "Mirtilo/Blueberry", "c": "Frutas", "g": "125g", "y": null, "r": null, "t": "Excelente opção. Seguro", "s": "green"}, {"n": "Morango", "c": "Frutas", "g": "65g", "y": "75g", "r": "100g", "t": "Contém frutose acima de 75g", "s": "yellow"}, {"n": "Nectarina", "c": "Frutas", "g": "85g", "y": "114g", "r": "150g", "t": "Contém sorbitol", "s": "yellow"}, {"n": "Pera", "c": "Frutas", "g": null, "y": null, "r": "170g", "t": "Alta em sorbitol e frutose. Evitar", "s": "red"}, {"n": "Pêssego amarelo", "c": "Frutas", "g": "103g", "y": "139g", "r": "145g", "t": "Contém sorbitol acima de 139g", "s": "yellow"}, {"n": "Pitaya", "c": "Frutas", "g": "330g", "y": null, "r": null, "t": "Excelente opção. Segura", "s": "green"}, {"n": "Romã", "c": "Frutas", "g": "42g", "y": "53g", "r": "87g", "t": "Contém frutanos acima de 53g", "s": "yellow"}, {"n": "Uva verde", "c": "Frutas", "g": "11g", "y": "15g", "r": "75g", "t": "Contém frutose. Porção pequena", "s": "yellow"}, {"n": "Uva vermelha", "c": "Frutas", "g": "10g", "y": "14g", "r": "75g", "t": "Contém frutose. Porção pequena", "s": "yellow"}, {"n": "Uva-passa", "c": "Frutas", "g": "4g", "y": "5g", "r": "30g", "t": "Alta em frutanos e frutose", "s": "yellow"}, {"n": "Banana-da-terra verde", "c": "Frutas", "g": "144g", "y": null, "r": null, "t": "Segura", "s": "green"}, {"n": "Abóbora japonesa/Kabocha", "c": "Vegetais", "g": "75g", "y": "162g", "r": "206g", "t": "Segura em porções normais", "s": "yellow"}, {"n": "Abóbora butternut", "c": "Vegetais", "g": "63g", "y": "75g", "r": "85g", "t": "Porções maiores contêm manitol e GOS", "s": "yellow"}, {"n": "Abobrinha", "c": "Vegetais", "g": "65g", "y": "75g", "r": "87g", "t": "Contém frutanos acima de 75g", "s": "yellow"}, {"n": "Acelga", "c": "Vegetais", "g": "75g", "y": "500g", "r": null, "t": "Segura em porções normais", "s": "yellow"}, {"n": "Agrião", "c": "Vegetais", "g": "80g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Aipo/Salsão (talos)", "c": "Vegetais", "g": "51g", "y": "75g", "r": "78g", "t": "Contém manitol acima de 75g", "s": "yellow"}, {"n": "Alcachofra", "c": "Vegetais", "g": "17g", "y": "20g", "r": "75g", "t": "Alta em frutanos", "s": "yellow"}, {"n": "Alface (todos os tipos)", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Alho", "c": "Vegetais", "g": null, "y": null, "r": "3g", "t": "Alto em frutanos. Use óleo de alho como alternativa", "s": "red"}, {"n": "Aspargo", "c": "Vegetais", "g": "12g", "y": "17g", "r": "75g", "t": "Alto em frutose e frutanos", "s": "yellow"}, {"n": "Batata inglesa", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Batata-doce", "c": "Vegetais", "g": "75g", "y": "100g", "r": null, "t": "Contém manitol acima de 100g", "s": "yellow"}, {"n": "Berinjela", "c": "Vegetais", "g": "75g", "y": "178g", "r": "269g", "t": "Contém sorbitol em porções grandes", "s": "yellow"}, {"n": "Beterraba", "c": "Vegetais", "g": "25g", "y": "32g", "r": "75g", "t": "Contém GOS e frutanos", "s": "yellow"}, {"n": "Brócolis (flores)", "c": "Vegetais", "g": "58g", "y": "87g", "r": "90g", "t": "Contém frutose acima de 87g", "s": "yellow"}, {"n": "Brócolis (talos)", "c": "Vegetais", "g": "90g", "y": "320g", "r": "350g", "t": "Talos são mais seguros que flores", "s": "yellow"}, {"n": "Cebola branca", "c": "Vegetais", "g": null, "y": "12g", "r": "75g", "t": "Alta em frutanos. Evitar", "s": "red"}, {"n": "Cebola roxa", "c": "Vegetais", "g": null, "y": null, "r": "75g", "t": "Alta em frutanos. Evitar", "s": "red"}, {"n": "Cebolinha (parte verde)", "c": "Vegetais", "g": "75g", "y": "265g", "r": "330g", "t": "Parte verde é segura", "s": "yellow"}, {"n": "Cebolinha (parte branca)", "c": "Vegetais", "g": "32g", "y": "44g", "r": "75g", "t": "Parte branca contém mais frutanos", "s": "yellow"}, {"n": "Cenoura", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Chuchu", "c": "Vegetais", "g": "75g", "y": "120g", "r": null, "t": "Seguro. Ótima opção brasileira", "s": "yellow"}, {"n": "Cogumelo champignon", "c": "Vegetais", "g": "7g", "y": "11g", "r": "75g", "t": "Alto em manitol", "s": "yellow"}, {"n": "Cogumelo shiitake", "c": "Vegetais", "g": "11g", "y": "17g", "r": "75g", "t": "Alto em manitol", "s": "yellow"}, {"n": "Couve", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Couve-flor", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Contém manitol. Cuidado com porções grandes", "s": "green"}, {"n": "Espinafre", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Gengibre", "c": "Vegetais", "g": "5g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Inhame", "c": "Vegetais", "g": "75g", "y": "275g", "r": "350g", "t": "Contém frutanos em porções grandes", "s": "yellow"}, {"n": "Mandioca/Aipim", "c": "Vegetais", "g": "75g", "y": "100g", "r": "120g", "t": "Contém GOS acima de 100g", "s": "yellow"}, {"n": "Milho doce", "c": "Vegetais", "g": "38g", "y": "63g", "r": "75g", "t": "Contém sorbitol", "s": "yellow"}, {"n": "Milho (enlatado, drenado)", "c": "Vegetais", "g": "75g", "y": "250g", "r": "310g", "t": "Seguro enlatado", "s": "yellow"}, {"n": "Palmito (enlatado)", "c": "Vegetais", "g": "146g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Pepino", "c": "Vegetais", "g": "75g", "y": "265g", "r": "396g", "t": "Seguro em porções normais", "s": "yellow"}, {"n": "Pimentão verde", "c": "Vegetais", "g": "75g", "y": "250g", "r": "310g", "t": "Seguro em porções normais", "s": "yellow"}, {"n": "Pimentão vermelho", "c": "Vegetais", "g": "43g", "y": "57g", "r": "75g", "t": "Contém frutose acima de 57g", "s": "yellow"}, {"n": "Quiabo", "c": "Vegetais", "g": "70g", "y": "75g", "r": "95g", "t": "Contém frutanos acima de 75g", "s": "yellow"}, {"n": "Rabanete", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Repolho verde", "c": "Vegetais", "g": "75g", "y": "100g", "r": "145g", "t": "Contém sorbitol acima de 100g", "s": "yellow"}, {"n": "Repolho roxo", "c": "Vegetais", "g": "75g", "y": "150g", "r": "180g", "t": "Contém frutanos acima de 150g", "s": "yellow"}, {"n": "Rúcula", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Tomate", "c": "Vegetais", "g": "65g", "y": "75g", "r": "91g", "t": "Contém frutose acima de 75g", "s": "yellow"}, {"n": "Tomate cereja", "c": "Vegetais", "g": "45g", "y": "60g", "r": "75g", "t": "Contém frutose acima de 60g", "s": "yellow"}, {"n": "Vagem", "c": "Vegetais", "g": "75g", "y": "120g", "r": "180g", "t": "Contém sorbitol acima de 120g", "s": "yellow"}, {"n": "Cará", "c": "Vegetais", "g": "75g", "y": "90g", "r": null, "t": "Contém GOS acima de 90g", "s": "yellow"}, {"n": "Nabo", "c": "Vegetais", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Arroz basmati", "c": "Cereais e Massas", "g": "190g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Arroz branco", "c": "Cereais e Massas", "g": "190g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Arroz integral", "c": "Cereais e Massas", "g": "180g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Aveia em flocos", "c": "Cereais e Massas", "g": "60g", "y": "240g", "r": null, "t": "Segura em porções normais", "s": "yellow"}, {"n": "Cuscuz de milho", "c": "Cereais e Massas", "g": "78g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Cuscuz de trigo", "c": "Cereais e Massas", "g": null, "y": null, "r": "77g", "t": "Alto em frutanos. Evitar", "s": "red"}, {"n": "Farinha de arroz", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Farinha de banana verde", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Farinha de mandioca", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Farinha de milho / Fubá", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Farinha de quinoa", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Farinha de trigo", "c": "Cereais e Massas", "g": null, "y": null, "r": "100g", "t": "Alta em frutanos. Evitar", "s": "red"}, {"n": "Farinha de trigo sarraceno", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre. Boa alternativa sem glúten", "s": "green"}, {"n": "Farinha de coco", "c": "Cereais e Massas", "g": null, "y": null, "r": "100g", "t": "Alta em frutose, frutanos e sorbitol", "s": "red"}, {"n": "Farinha de grão-de-bico", "c": "Cereais e Massas", "g": "10g", "y": "12g", "r": "100g", "t": "Porções muito pequenas", "s": "yellow"}, {"n": "Farinha de amêndoa", "c": "Cereais e Massas", "g": "33g", "y": "39g", "r": "48g", "t": "Contém GOS acima de 39g", "s": "yellow"}, {"n": "Flocos de quinoa", "c": "Cereais e Massas", "g": "45g", "y": "84g", "r": "99g", "t": "Contém frutanos acima de 84g", "s": "yellow"}, {"n": "Macarrão de arroz", "c": "Cereais e Massas", "g": "220g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Macarrão sem glúten", "c": "Cereais e Massas", "g": "145g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Milho (amido / Maisena)", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Pão sem glúten (arroz e milho)", "c": "Cereais e Massas", "g": "52g", "y": "61g", "r": "82g", "t": "Verificar ingredientes", "s": "yellow"}, {"n": "Polenta", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Quinoa em grãos", "c": "Cereais e Massas", "g": "155g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Sagu", "c": "Cereais e Massas", "g": "160g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Tapioca", "c": "Cereais e Massas", "g": "100g", "y": null, "r": null, "t": "Livre. Excelente opção brasileira", "s": "green"}, {"n": "Pão de centeio", "c": "Cereais e Massas", "g": null, "y": null, "r": "86g", "t": "Alto em frutanos. Evitar", "s": "red"}, {"n": "Leite de vaca integral", "c": "Laticínios", "g": "20g", "y": "60g", "r": "257g", "t": "Contém lactose", "s": "yellow"}, {"n": "Leite de vaca sem lactose", "c": "Laticínios", "g": "257g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Leite de amêndoas", "c": "Laticínios", "g": "240g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Leite de arroz", "c": "Laticínios", "g": "200g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Leite de coco (UHT)", "c": "Laticínios", "g": "180g", "y": "240g", "r": null, "t": "Contém sorbitol acima de 240ml", "s": "yellow"}, {"n": "Leite de coco (enlatado)", "c": "Laticínios", "g": "60g", "y": "120g", "r": "180g", "t": "Contém sorbitol", "s": "yellow"}, {"n": "Leite de aveia", "c": "Laticínios", "g": "104g", "y": "121g", "r": "250g", "t": "Contém sorbitol e frutanos", "s": "yellow"}, {"n": "Leite de soja (proteína isolada)", "c": "Laticínios", "g": "257g", "y": null, "r": null, "t": "Livre. Verificar se é da proteína", "s": "green"}, {"n": "Leite de soja (grão inteiro)", "c": "Laticínios", "g": null, "y": "128g", "r": "257g", "t": "Contém GOS. Evitar", "s": "red"}, {"n": "Leite de quinoa", "c": "Laticínios", "g": "240g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Iogurte natural sem lactose", "c": "Laticínios", "g": "170g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Iogurte grego natural", "c": "Laticínios", "g": "23g", "y": "93g", "r": "170g", "t": "Contém lactose", "s": "yellow"}, {"n": "Iogurte de coco", "c": "Laticínios", "g": "170g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Kefir de leite", "c": "Laticínios", "g": "23g", "y": "64g", "r": "200g", "t": "Contém lactose", "s": "yellow"}, {"n": "Queijo mussarela", "c": "Laticínios", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Queijo parmesão", "c": "Laticínios", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Queijo cheddar", "c": "Laticínios", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Queijo brie", "c": "Laticínios", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Queijo feta", "c": "Laticínios", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Queijo cottage", "c": "Laticínios", "g": "40g", "y": "60g", "r": null, "t": "Contém lactose acima de 60g", "s": "yellow"}, {"n": "Ricota", "c": "Laticínios", "g": "40g", "y": "120g", "r": "200g", "t": "Contém lactose", "s": "yellow"}, {"n": "Cream cheese", "c": "Laticínios", "g": "40g", "y": "80g", "r": null, "t": "Contém lactose acima de 80g", "s": "yellow"}, {"n": "Creme de leite", "c": "Laticínios", "g": "30g", "y": "40g", "r": null, "t": "Contém lactose acima de 40g", "s": "yellow"}, {"n": "Manteiga", "c": "Laticínios", "g": "19g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Ghee", "c": "Laticínios", "g": "19g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Carne bovina", "c": "Carnes e Ovos", "g": "125g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Frango", "c": "Carnes e Ovos", "g": "125g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Carne suína", "c": "Carnes e Ovos", "g": "125g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Peixe (todos)", "c": "Carnes e Ovos", "g": "115g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Ovo", "c": "Carnes e Ovos", "g": "117g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Camarão", "c": "Carnes e Ovos", "g": "60g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Atum enlatado", "c": "Carnes e Ovos", "g": "100g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Sardinha enlatada", "c": "Carnes e Ovos", "g": "75g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Bacon", "c": "Carnes e Ovos", "g": "60g", "y": null, "r": null, "t": "Livre. Sem temperos com alho/cebola", "s": "green"}, {"n": "Peru", "c": "Carnes e Ovos", "g": "125g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Feijão preto (cozido)", "c": "Leguminosas", "g": "40g", "y": "45g", "r": "105g", "t": "Contém GOS e frutanos", "s": "yellow"}, {"n": "Feijão preto (enlatado, drenado)", "c": "Leguminosas", "g": "45g", "y": "54g", "r": "205g", "t": "Enlatado é mais seguro", "s": "yellow"}, {"n": "Feijão carioca/vermelho (cozido)", "c": "Leguminosas", "g": "14g", "y": "17g", "r": "175g", "t": "Alto em GOS. Porção bem pequena", "s": "yellow"}, {"n": "Feijão carioca (enlatado, drenado)", "c": "Leguminosas", "g": "86g", "y": "102g", "r": "205g", "t": "Enlatado/drenado é mais seguro", "s": "yellow"}, {"n": "Grão-de-bico (cozido)", "c": "Leguminosas", "g": "29g", "y": "33g", "r": "173g", "t": "Contém GOS", "s": "yellow"}, {"n": "Grão-de-bico (enlatado, drenado)", "c": "Leguminosas", "g": "80g", "y": "95g", "r": "200g", "t": "Enlatado é mais seguro", "s": "yellow"}, {"n": "Lentilha verde (cozida)", "c": "Leguminosas", "g": "29g", "y": "34g", "r": "185g", "t": "Contém GOS e frutanos", "s": "yellow"}, {"n": "Lentilha vermelha (cozida)", "c": "Leguminosas", "g": "48g", "y": "57g", "r": "185g", "t": "Um pouco mais segura que a verde", "s": "yellow"}, {"n": "Lentilha (enlatada, drenada)", "c": "Leguminosas", "g": "64g", "y": "76g", "r": "185g", "t": "Enlatada é mais segura", "s": "yellow"}, {"n": "Ervilha (enlatada, drenada)", "c": "Leguminosas", "g": "45g", "y": "55g", "r": "75g", "t": "Contém GOS", "s": "yellow"}, {"n": "Soja (cozida)", "c": "Leguminosas", "g": null, "y": null, "r": "43g", "t": "Alta em GOS e frutanos", "s": "red"}, {"n": "Edamame", "c": "Leguminosas", "g": "90g", "y": "210g", "r": null, "t": "Seguro em porções controladas", "s": "yellow"}, {"n": "Fava", "c": "Leguminosas", "g": null, "y": null, "r": "44g", "t": "Alta em frutose", "s": "red"}, {"n": "Amendoim", "c": "Castanhas e Sementes", "g": "28g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Amêndoa", "c": "Castanhas e Sementes", "g": "12g", "y": null, "r": "24g", "t": "Contém GOS acima de 24g", "s": "yellow"}, {"n": "Castanha-do-pará", "c": "Castanhas e Sementes", "g": "40g", "y": null, "r": null, "t": "Livre em porções normais", "s": "green"}, {"n": "Castanha de caju", "c": "Castanhas e Sementes", "g": null, "y": null, "r": "15g", "t": "Alta em frutanos e GOS. Evitar", "s": "red"}, {"n": "Nozes", "c": "Castanhas e Sementes", "g": "30g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Noz-pecã", "c": "Castanhas e Sementes", "g": "20g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Macadâmia", "c": "Castanhas e Sementes", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Avelã", "c": "Castanhas e Sementes", "g": "15g", "y": null, "r": "30g", "t": "Contém GOS acima de 30g", "s": "yellow"}, {"n": "Pistache", "c": "Castanhas e Sementes", "g": null, "y": null, "r": "11g", "t": "Alto em GOS e frutanos. Evitar", "s": "red"}, {"n": "Semente de chia", "c": "Castanhas e Sementes", "g": "24g", "y": null, "r": null, "t": "Segura. Porções acima de 48g contêm frutanos", "s": "green"}, {"n": "Semente de linhaça", "c": "Castanhas e Sementes", "g": "15g", "y": null, "r": "30g", "t": "Contém GOS acima de 15g", "s": "yellow"}, {"n": "Semente de girassol", "c": "Castanhas e Sementes", "g": "23g", "y": null, "r": null, "t": "Livre em porções normais", "s": "green"}, {"n": "Semente de abóbora", "c": "Castanhas e Sementes", "g": "24g", "y": null, "r": null, "t": "Livre em porções normais", "s": "green"}, {"n": "Gergelim", "c": "Castanhas e Sementes", "g": "11g", "y": null, "r": null, "t": "Livre em porções normais", "s": "green"}, {"n": "Pasta de amendoim", "c": "Castanhas e Sementes", "g": "50g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Tahini", "c": "Castanhas e Sementes", "g": "30g", "y": "184g", "r": "217g", "t": "Seguro em porções normais", "s": "yellow"}, {"n": "Azeite de oliva", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Óleo de coco", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Óleo de girassol", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Óleo de canola", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Óleo de gergelim", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Óleo de oliva infusionado com alho", "c": "Óleos e Gorduras", "g": "18g", "y": null, "r": null, "t": "Livre. Alternativa ao alho fresco", "s": "green"}, {"n": "Maionese", "c": "Óleos e Gorduras", "g": "40g", "y": null, "r": null, "t": "Livre. Sem alho/cebola", "s": "green"}, {"n": "Margarina", "c": "Óleos e Gorduras", "g": "19g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Café espresso", "c": "Bebidas", "g": "30g", "y": "60g", "r": null, "t": "Seguro em 1-2 doses", "s": "yellow"}, {"n": "Café instantâneo", "c": "Bebidas", "g": "30g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Chá preto fraco", "c": "Bebidas", "g": "250ml", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Chá preto forte", "c": "Bebidas", "g": "180ml", "y": "250ml", "r": null, "t": "Contém frutanos forte", "s": "yellow"}, {"n": "Chá verde", "c": "Bebidas", "g": "180ml", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Chá de hortelã", "c": "Bebidas", "g": "180ml", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Chá de camomila", "c": "Bebidas", "g": null, "y": "180ml", "r": null, "t": "Contém frutanos. Cuidado", "s": "yellow"}, {"n": "Chá de erva-doce", "c": "Bebidas", "g": null, "y": null, "r": "180ml", "t": "Contém GOS e frutanos. Evitar", "s": "red"}, {"n": "Água de coco fresca", "c": "Bebidas", "g": "100ml", "y": "163ml", "r": "250ml", "t": "Contém frutanos e sorbitol", "s": "yellow"}, {"n": "Água de coco industrial", "c": "Bebidas", "g": "105ml", "y": "158ml", "r": "267ml", "t": "Contém frutanos e sorbitol", "s": "yellow"}, {"n": "Suco de laranja espremido", "c": "Bebidas", "g": "72ml", "y": "97ml", "r": "200ml", "t": "Contém frutose", "s": "yellow"}, {"n": "Suco de limão", "c": "Bebidas", "g": "21ml", "y": "178ml", "r": null, "t": "Livre em porções normais", "s": "yellow"}, {"n": "Cerveja", "c": "Bebidas", "g": "375ml", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Vinho tinto", "c": "Bebidas", "g": "149ml", "y": "250ml", "r": null, "t": "Contém frutose acima de 250ml", "s": "yellow"}, {"n": "Vinho branco", "c": "Bebidas", "g": "149ml", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Kombucha", "c": "Bebidas", "g": "180ml", "y": null, "r": "250ml", "t": "Contém frutanos acima de 250ml", "s": "yellow"}, {"n": "Refrigerante cola", "c": "Bebidas", "g": "149ml", "y": "189ml", "r": "250ml", "t": "Contém frutose", "s": "yellow"}, {"n": "Alho em pó", "c": "Temperos", "g": null, "y": null, "r": "2g", "t": "Contém frutanos. Evitar", "s": "red"}, {"n": "Shoyu/Molho de soja", "c": "Temperos", "g": "42g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Vinagre de maçã", "c": "Temperos", "g": "42g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Vinagre balsâmico", "c": "Temperos", "g": "21g", "y": "42g", "r": null, "t": "Contém frutose acima de 42g", "s": "yellow"}, {"n": "Ketchup", "c": "Temperos", "g": "13g", "y": "20g", "r": "26g", "t": "Contém frutanos", "s": "yellow"}, {"n": "Mostarda", "c": "Temperos", "g": "11g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Azeite com alho (infusionado)", "c": "Temperos", "g": "18g", "y": null, "r": null, "t": "Livre. Melhor substituto do alho", "s": "green"}, {"n": "Molho de pimenta", "c": "Temperos", "g": "5g", "y": null, "r": null, "t": "Livre em porções pequenas", "s": "green"}, {"n": "Missô", "c": "Temperos", "g": "12g", "y": "75g", "r": null, "t": "Contém frutanos acima de 75g", "s": "yellow"}, {"n": "Orégano", "c": "Temperos", "g": "3g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Manjericão fresco", "c": "Temperos", "g": "16g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Coentro fresco", "c": "Temperos", "g": "16g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Salsa fresca", "c": "Temperos", "g": "16g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Alecrim fresco", "c": "Temperos", "g": "16g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Cominho", "c": "Temperos", "g": "2g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Cúrcuma/Açafrão-da-terra", "c": "Temperos", "g": "2g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Canela", "c": "Temperos", "g": "2g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Pimenta-do-reino", "c": "Temperos", "g": "2g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Gengibre (raiz)", "c": "Temperos", "g": "5g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Curry em pó", "c": "Temperos", "g": "2g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Passata de tomate", "c": "Temperos", "g": "72g", "y": "95g", "r": "150g", "t": "Contém frutose acima de 95g", "s": "yellow"}, {"n": "Barbecue (sem alho/cebola)", "c": "Temperos", "g": "46g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Geleia de morango", "c": "Temperos", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Mel", "c": "Temperos", "g": null, "y": "14g", "r": "28g", "t": "Alto em frutose. Evitar ou usar com cautela", "s": "red"}, {"n": "Hommus/Húmus", "c": "Temperos", "g": null, "y": "20g", "r": "40g", "t": "Contém frutanos e GOS", "s": "red"}, {"n": "Açúcar refinado", "c": "Açúcares", "g": "50g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Açúcar mascavo", "c": "Açúcares", "g": "40g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Açúcar demerara", "c": "Açúcares", "g": "4g", "y": "75g", "r": "100g", "t": "Contém frutose acima de 75g", "s": "yellow"}, {"n": "Açúcar de coco", "c": "Açúcares", "g": "4g", "y": "10g", "r": "12g", "t": "Contém frutanos. Porção muito pequena", "s": "yellow"}, {"n": "Stevia", "c": "Açúcares", "g": "5g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Maple syrup", "c": "Açúcares", "g": "50g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Melado", "c": "Açúcares", "g": "5g", "y": "10g", "r": "20g", "t": "Contém frutanos e frutose", "s": "yellow"}, {"n": "Agave", "c": "Açúcares", "g": "5g", "y": null, "r": "21g", "t": "Alto em frutose. Evitar", "s": "yellow"}, {"n": "Gelatina (morango/framboesa)", "c": "Açúcares", "g": "280g", "y": null, "r": null, "t": "Livre", "s": "green"}, {"n": "Tofu firme", "c": "Proteínas Vegetais", "g": "170g", "y": "175g", "r": "205g", "t": "Seguro. Usar firme ou extra-firme", "s": "yellow"}, {"n": "Tofu macio/sedoso", "c": "Proteínas Vegetais", "g": "39g", "y": "46g", "r": "170g", "t": "Contém GOS. Preferir firme", "s": "yellow"}, {"n": "Tempeh", "c": "Proteínas Vegetais", "g": "100g", "y": null, "r": null, "t": "Seguro em porções normais", "s": "green"}];

const CAT_INFO = {
  "Frutas": { icon: "🍎", color: "#e74c3c" },
  "Vegetais": { icon: "🥬", color: "#27ae60" },
  "Cereais e Massas": { icon: "🍚", color: "#f39c12" },
  "Laticínios": { icon: "🥛", color: "#3498db" },
  "Carnes e Ovos": { icon: "🥩", color: "#e67e22" },
  "Leguminosas": { icon: "🫘", color: "#8e44ad" },
  "Castanhas e Sementes": { icon: "🥜", color: "#d35400" },
  "Óleos e Gorduras": { icon: "🫒", color: "#f1c40f" },
  "Bebidas": { icon: "☕", color: "#1abc9c" },
  "Temperos": { icon: "🌿", color: "#2ecc71" },
  "Açúcares": { icon: "🍯", color: "#e91e63" },
  "Proteínas Vegetais": { icon: "🫛", color: "#9c27b0" },
};

const CATS = Object.keys(CAT_INFO);

const BRAND = "#204040";
const BRAND_LIGHT = "#2a5555";
const BRAND_BG = "#f0f5f4";

export default function GuiaFODMAP() {
  const [view, setView] = useState("home"); // home | category | search
  const [activeCat, setActiveCat] = useState(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const normalize = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = normalize(search);
    return DB.filter((f) => normalize(f.n).includes(q));
  }, [search]);

  const categoryFoods = useMemo(() => {
    if (!activeCat) return [];
    let items = DB.filter((f) => f.c === activeCat);
    if (statusFilter !== "all") items = items.filter((f) => f.s === statusFilter);
    return items;
  }, [activeCat, statusFilter]);

  const openCategory = (cat) => {
    setActiveCat(cat);
    setView("category");
    setSelected(null);
    setStatusFilter("all");
  };

  const openSearch = () => {
    setView("search");
    setSelected(null);
    setSearch("");
  };

  const goHome = () => {
    setView("home");
    setActiveCat(null);
    setSearch("");
    setSelected(null);
    setStatusFilter("all");
  };

  const renderFoodCard = (food, idx) => {
    const isOpen = selected === food.n + idx;
    const statusColors = {
      green: { bg: "#f0fdf4", border: "#86efac", icon: "✅", label: "Pode comer", text: "#166534" },
      yellow: { bg: "#fffbeb", border: "#fcd34d", icon: "⚠️", label: "Com atenção", text: "#92400e" },
      red: { bg: "#fef2f2", border: "#fca5a5", icon: "🚫", label: "Evitar", text: "#991b1b" },
    };
    const sc = statusColors[food.s];

    return (
      <div
        key={food.n + idx}
        onClick={() => setSelected(isOpen ? null : food.n + idx)}
        style={{
          background: "white",
          borderRadius: 16,
          padding: "14px 16px",
          marginBottom: 8,
          cursor: "pointer",
          border: `1.5px solid ${isOpen ? sc.border : "#f1f5f9"}`,
          boxShadow: isOpen ? "0 4px 16px rgba(0,0,0,.06)" : "0 1px 3px rgba(0,0,0,.02)",
          transition: "all .2s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1e293b" }}>{food.n}</div>
            {food.g && !food.y && !food.r && (
              <div style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>Livre — até {food.g}</div>
            )}
            {food.g && (food.y || food.r) && (
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Seguro até {food.g}</div>
            )}
            {!food.g && food.r && (
              <div style={{ fontSize: 12, color: "#dc2626", marginTop: 2 }}>Evitar ou porção mínima</div>
            )}
          </div>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: sc.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 17,
              flexShrink: 0,
              marginLeft: 12,
              border: `2px solid ${sc.border}`,
            }}
          >
            {sc.icon}
          </div>
        </div>

        {isOpen && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {food.g && (
                <div style={{ padding: "7px 12px", borderRadius: 10, background: "#f0fdf4", border: "1px solid #86efac", fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "#16a34a" }}>✅</span>{" "}
                  <span style={{ color: "#166534" }}>Até {food.g}</span>
                </div>
              )}
              {food.y && (
                <div style={{ padding: "7px 12px", borderRadius: 10, background: "#fffbeb", border: "1px solid #fcd34d", fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "#d97706" }}>⚠️</span>{" "}
                  <span style={{ color: "#92400e" }}>{food.y}</span>
                </div>
              )}
              {food.r && (
                <div style={{ padding: "7px 12px", borderRadius: 10, background: "#fef2f2", border: "1px solid #fca5a5", fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: "#dc2626" }}>🚫</span>{" "}
                  <span style={{ color: "#991b1b" }}>Acima de {food.r}</span>
                </div>
              )}
            </div>
            {food.t && (
              <p style={{ margin: 0, fontSize: 13, color: "#64748b", lineHeight: 1.5, fontStyle: "italic" }}>
                💡 {food.t}
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  // ===== HOME VIEW =====
  if (view === "home") {
    return (
      <div style={{ minHeight: "100vh", background: BRAND_BG, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_LIGHT} 100%)`, padding: "36px 20px 32px", color: "white", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Guia FODMAP</h1>
          <p style={{ margin: "6px 0 0", fontSize: 14, opacity: 0.75 }}>Nutri Vitor Sandrin</p>
        </div>

        {/* Search bar */}
        <div style={{ padding: "16px 16px 8px" }}>
          <div
            onClick={openSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "13px 16px",
              background: "white",
              borderRadius: 14,
              border: "2px solid #e2e8f0",
              cursor: "pointer",
              color: "#94a3b8",
              fontSize: 15,
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>
            Buscar alimento...
          </div>
        </div>

        {/* Legend */}
        <div style={{ padding: "8px 16px 4px", display: "flex", gap: 12, justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "#16a34a" }}>✅ Pode comer</span>
          <span style={{ fontSize: 12, color: "#d97706" }}>⚠️ Com atenção</span>
          <span style={{ fontSize: 12, color: "#dc2626" }}>🚫 Evitar</span>
        </div>

        {/* Categories grid */}
        <div style={{ padding: "12px 16px 100px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {CATS.map((cat) => {
              const info = CAT_INFO[cat];
              const count = DB.filter((f) => f.c === cat).length;
              const greens = DB.filter((f) => f.c === cat && f.s === "green").length;
              return (
                <div
                  key={cat}
                  onClick={() => openCategory(cat)}
                  style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "18px 16px",
                    cursor: "pointer",
                    border: "1.5px solid #f1f5f9",
                    transition: "all .2s",
                    boxShadow: "0 1px 4px rgba(0,0,0,.03)",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = BRAND)}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "#f1f5f9")}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{info.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", marginBottom: 4 }}>{cat}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8" }}>
                    {count} alimentos • {greens} livres
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)", borderTop: "1px solid #e2e8f0", padding: "10px 16px", textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
          <strong style={{ color: BRAND }}>Nutri Vitor Sandrin</strong> — Material de apoio ao paciente
          <br />Baseado em dados da Monash University. Não substitui orientação profissional.
        </div>
      </div>
    );
  }

  // ===== SEARCH VIEW =====
  if (view === "search") {
    return (
      <div style={{ minHeight: "100vh", background: BRAND_BG, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{ background: BRAND, padding: "16px 16px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={goHome} style={{ background: "none", border: "none", color: "white", fontSize: 22, cursor: "pointer", padding: 4 }}>
            ←
          </button>
          <div style={{ flex: 1, position: "relative" }}>
            <input
              autoFocus
              type="text"
              placeholder="Digite o alimento... ex: banana"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 40px 12px 16px",
                borderRadius: 12,
                border: "none",
                fontSize: 15,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: 8, background: "#e2e8f0", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: "pointer", fontSize: 13, color: "#64748b" }}>
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div style={{ padding: "12px 16px 100px" }}>
          {!search.trim() ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p style={{ fontSize: 15, margin: 0 }}>Digite o nome do alimento</p>
              <p style={{ fontSize: 13, margin: "6px 0 0" }}>Ex: arroz, feijão, banana, queijo...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
              <p style={{ fontSize: 15, margin: 0 }}>Nenhum alimento encontrado</p>
              <p style={{ fontSize: 13, margin: "6px 0 0" }}>Tente outro termo</p>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 13, color: "#94a3b8", marginBottom: 8 }}>
                {searchResults.length} resultado{searchResults.length !== 1 ? "s" : ""}
              </div>
              {searchResults.map((food, i) => renderFoodCard(food, i))}
            </>
          )}
        </div>
      </div>
    );
  }

  // ===== CATEGORY VIEW =====
  if (view === "category") {
    const info = CAT_INFO[activeCat] || { icon: "📋", color: BRAND };
    const catCounts = {
      all: DB.filter((f) => f.c === activeCat).length,
      green: DB.filter((f) => f.c === activeCat && f.s === "green").length,
      yellow: DB.filter((f) => f.c === activeCat && f.s === "yellow").length,
      red: DB.filter((f) => f.c === activeCat && f.s === "red").length,
    };

    return (
      <div style={{ minHeight: "100vh", background: BRAND_BG, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Header */}
        <div style={{ background: BRAND, padding: "16px 20px 20px", color: "white" }}>
          <button onClick={goHome} style={{ background: "none", border: "none", color: "rgba(255,255,255,.7)", fontSize: 14, cursor: "pointer", padding: 0, marginBottom: 8, fontFamily: "inherit" }}>
            ← Voltar
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 36 }}>{info.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{activeCat}</h2>
              <p style={{ margin: "2px 0 0", fontSize: 13, opacity: 0.7 }}>{catCounts.all} alimentos</p>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div style={{ padding: "12px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
          {[
            { key: "all", label: "Todos", count: catCounts.all },
            { key: "green", label: "✅ Pode", count: catCounts.green },
            { key: "yellow", label: "⚠️ Atenção", count: catCounts.yellow },
            { key: "red", label: "🚫 Evitar", count: catCounts.red },
          ].map((p) => (
            <button
              key={p.key}
              onClick={() => setStatusFilter(p.key)}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: statusFilter === p.key ? `2px solid ${BRAND}` : "2px solid transparent",
                background: statusFilter === p.key ? "white" : "#f1f5f9",
                color: statusFilter === p.key ? BRAND : "#64748b",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}
            >
              {p.label} ({p.count})
            </button>
          ))}
        </div>

        {/* Food list */}
        <div style={{ padding: "0 16px 100px" }}>
          {categoryFoods.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#94a3b8" }}>
              <p style={{ fontSize: 14 }}>Nenhum alimento nessa categoria com esse filtro.</p>
            </div>
          ) : (
            categoryFoods.map((food, i) => renderFoodCard(food, i))
          )}
        </div>

        {/* Footer */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(255,255,255,.95)", backdropFilter: "blur(10px)", borderTop: "1px solid #e2e8f0", padding: "10px 16px", textAlign: "center", fontSize: 11, color: "#94a3b8" }}>
          <strong style={{ color: BRAND }}>Nutri Vitor Sandrin</strong> — Baseado em dados da Monash University
        </div>
      </div>
    );
  }

  return null;
}
