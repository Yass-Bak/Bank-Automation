package tn.iit.dto;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Data
@Getter
@Setter
public class LoginRequestDto {
    private String email;
    private String password;

}
