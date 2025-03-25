#
# Package stage
#
FROM eclipse-temurin:22-jdk
RUN mkdir /opt/app
COPY target/Pomotivity-0.0.1-SNAPSHOT.jar /opt/app
CMD ["java", "-jar", "/opt/app/Pomotivity-0.0.1-SNAPSHOT.jar"]