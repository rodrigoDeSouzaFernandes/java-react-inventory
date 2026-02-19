package com.autoflex.inventory.production;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.Test;

import com.autoflex.inventory.production.DTO.ProductionSuggestionDTO;
import com.autoflex.inventory.production.DTO.ProductionSuggestionItemDTO;

import io.quarkus.test.junit.QuarkusTest;
import io.quarkus.test.InjectMock;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.when;

@QuarkusTest
class ProductionResourceTest {

    @InjectMock
    ProductionService productionService;

    @Test
    void shouldReturnProductionSuggestion() {

        ProductionSuggestionItemDTO item = new ProductionSuggestionItemDTO();
        item.productId = 1L;
        item.productName = "Product A";
        item.producibleQuantity = 10;
        item.unitValue = BigDecimal.valueOf(200);
        item.totalValue = BigDecimal.valueOf(2000);

        ProductionSuggestionDTO dto = new ProductionSuggestionDTO();
        dto.items = List.of(item);
        dto.grandTotal = BigDecimal.valueOf(2000);

        when(productionService.calculateProductionSuggestion())
                .thenReturn(dto);

        given()
                .when().get("/production/suggestion")
                .then()
                .statusCode(200)
                .body("items.size()", is(1))
                .body("items[0].productName", is("Product A"))
                .body("grandTotal", is(2000));
    }
}
